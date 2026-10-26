import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { resolveLineItems } from "@/lib/checkout";

const bodySchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        size: z.string().optional(),
        quantity: z.number().int().positive().max(20),
      })
    )
    .min(1),
});

export async function POST(request: Request) {
  try {
    if (!isStripeConfigured()) {
      return NextResponse.json(
        { error: "Checkout isn't live yet. Stripe keys still need to be added." },
        { status: 503 }
      );
    }

    const { items } = bodySchema.parse(await request.json());

    const products = await prisma.product.findMany({
      where: { id: { in: [...new Set(items.map((i) => i.productId))] }, active: true },
    });

    const lineItems = resolveLineItems(items, products);
    const totalCents = lineItems.reduce((sum, li) => sum + li.product.priceCents * li.quantity, 0);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const order = await prisma.order.create({
      data: {
        email: "pending@checkout",
        status: "pending",
        totalCents,
        items: {
          create: lineItems.map((li) => ({
            productId: li.product.id,
            title: li.product.title,
            size: li.size ?? null,
            quantity: li.quantity,
            priceCents: li.product.priceCents,
          })),
        },
      },
    });

    let session;
    try {
      session = await getStripe().checkout.sessions.create({
        mode: "payment",
        line_items: lineItems.map((li) => ({
          quantity: li.quantity,
          price_data: {
            currency: "usd",
            unit_amount: li.product.priceCents,
            product_data: {
              name: li.size ? `${li.product.title} — ${li.size}` : li.product.title,
              description: li.product.description.slice(0, 400),
              images: li.product.imageUrl?.startsWith("http") ? [li.product.imageUrl] : undefined,
            },
          },
        })),
        success_url: `${siteUrl}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${siteUrl}/shop?cancelled=1`,
        shipping_address_collection: { allowed_countries: ["US", "CA"] },
        metadata: { orderId: order.id },
      });
    } catch (stripeError) {
      console.error("[checkout] Stripe session failed:", stripeError);
      await prisma.order.delete({ where: { id: order.id } });
      return NextResponse.json(
        { error: "Checkout is temporarily unavailable. Please try again shortly." },
        { status: 502 }
      );
    }

    await prisma.order.update({ where: { id: order.id }, data: { stripeSessionId: session.id } });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
