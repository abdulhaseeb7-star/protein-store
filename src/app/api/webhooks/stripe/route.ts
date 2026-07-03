import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;

    if (!userId || !session.amount_total) return NextResponse.json({ ok: true });

    // Get line items from Stripe
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      expand: ["data.price.product"],
    });

    try {
      await prisma.order.create({
        data: {
          userId,
          total: session.amount_total / 100,
          status: "PAID",
          stripeSessionId: session.id,
          shippingName: session.customer_details?.name ?? "",
          shippingAddress: session.customer_details?.address?.line1 ?? "",
          shippingCity: session.customer_details?.address?.city ?? "",
          shippingPhone: session.customer_details?.phone ?? "",
          items: {
            create: lineItems.data.map((item) => {
              const product = item.price?.product as Stripe.Product;
              return {
                productId: product.metadata?.productId ?? "",
                quantity: item.quantity ?? 1,
                priceAtTime: (item.price?.unit_amount ?? 0) / 100,
              };
            }),
          },
        },
      });
    } catch (err) {
      console.error("Order save error:", err);
    }
  }

  return NextResponse.json({ ok: true });
}