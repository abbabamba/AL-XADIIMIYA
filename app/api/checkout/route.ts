import Stripe from "stripe";

export async function POST(req: Request) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

    const body = await req.json();
    const items = body?.items as Array<{ title: string; qty: number; priceCents: number }>;

    if (!items?.length) {
      return Response.json({ error: "Panier vide" }, { status: 400 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: items.map((i) => ({
        price_data: {
          currency: "eur",
          product_data: { name: i.title },
          unit_amount: i.priceCents,
        },
        quantity: i.qty,
      })),
      success_url: `${siteUrl}/success`,
      cancel_url: `${siteUrl}/cancel`,
      shipping_address_collection: {
        allowed_countries: ["FR"],
      },
    });

    return Response.json({ url: session.url });
  } catch (e) {
    return Response.json({ error: "Checkout failed" }, { status: 500 });
  }
}
