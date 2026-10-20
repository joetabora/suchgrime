import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { prisma } from "@/lib/db";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 503 });
  }

  const stripe = getStripe();
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const body = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, secret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;

    if (orderId) {
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { items: true },
      });

      if (order && order.status !== "paid") {
        await prisma.$transaction(async (tx) => {
          const shipping = session.collected_information?.shipping_details;

          await tx.order.update({
            where: { id: order.id },
            data: {
              status: "paid",
              email: session.customer_details?.email || session.customer_email || order.email,
              stripePaymentIntentId:
                typeof session.payment_intent === "string"
                  ? session.payment_intent
                  : session.payment_intent?.id || null,
              shippingName: shipping?.name || session.customer_details?.name || null,
              shippingAddress: shipping?.address
                ? JSON.stringify(shipping.address)
                : session.customer_details?.address
                  ? JSON.stringify(session.customer_details.address)
                  : null,
            },
          });

          for (const item of order.items) {
            await tx.product.update({
              where: { id: item.productId },
              data: {
                inventory: { decrement: item.quantity },
              },
            });
          }
        });
      }
    }
  }

  return NextResponse.json({ received: true });
}
