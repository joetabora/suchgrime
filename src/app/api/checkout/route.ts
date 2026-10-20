import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getStripe, isStripeConfigured } from "@/lib/stripe";

const bodySchema = z.object({
  items: z.array(
    z.object({
      productId: z.string().min(1),
      quantity: z.number().int().positive().max(20),
    })
  ).min(1),
});

export async function POST(request: Request) {
  try {
    if (!isStripeConfigured()) {
      return NextResponse.json(
        { error: "Stripe is not configured. Add STRIPE_SECRET_KEY to your environment." },
        { status: 503 }
      );
    }

    const json = await request.json();
    const { items } = bodySchema.parse(json);

    const products = await prisma.product.findMany({
      where: {
        id: { in: items.map((i) => i.productId) },
        active: true,
      },
    });

    if (products.length !== items.length) {
      return NextResponse.json({ error: "One or more products are unavailable." }, { status: 400 });
    }

    const lineItems = items.map((item) => {
      const product = products.find((p) => p.id === item.productId)!;
      if (product.status !== "available") {
        throw new Error(`${product.title} is not available for purchase.`);
      }
      if (product.inventory < item.quantity) {
        throw new Error(`Not enough inventory for ${product.title}.`);
      }
      return {
        product,
        quantity: item.quantity,
      };
    });

    const totalCents = lineItems.reduce(
      (sum, li) => sum + li.product.priceCents * li.quantity,
      0
    );

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const stripe = getStripe();

    const order = await prisma.order.create({
      data: {
        email: "pending@checkout",
        status: "pending",
        totalCents,
        items: {
          create: lineItems.map((li) => ({
            productId: li.product.id,
            title: li.product.title,
            quantity: li.quantity,
            priceCents: li.product.priceCents,
          })),
        },
      },
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems.map((li) => ({
        quantity: li.quantity,
        price_data: {
          currency: "usd",
          unit_amount: li.product.priceCents,
          product_data: {
            name: li.product.title,
            description: li.product.description.slice(0, 400),
            images: li.product.imageUrl ? [li.product.imageUrl] : undefined,
          },
        },
      })),
      success_url: `${siteUrl}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/shop?cancelled=1`,
      shipping_address_collection: {
        allowed_countries: ["US", "CA"],
      },
      metadata: {
        orderId: order.id,
      },
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: session.id },
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
