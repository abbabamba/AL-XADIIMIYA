import Stripe from "stripe";

type CartItem = { title: string; qty: number; priceCents: number };

export async function POST(req: Request) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

    const body = await req.json();
    const items = body?.items as CartItem[] | undefined;

    // --- Input validation ---
    if (!Array.isArray(items) || items.length === 0) {
      return Response.json({ error: "Panier vide" }, { status: 400 });
    }

    for (const item of items) {
      if (!item.title || typeof item.title !== "string" || item.title.trim() === "") {
        return Response.json({ error: "Titre de produit invalide" }, { status: 400 });
      }
      if (!Number.isInteger(item.priceCents) || item.priceCents <= 0) {
        return Response.json({ error: "Prix invalide" }, { status: 400 });
      }
      if (!Number.isInteger(item.qty) || item.qty <= 0) {
        return Response.json({ error: "Quantité invalide" }, { status: 400 });
      }
    }
    // --- End validation ---

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      phone_number_collection: {
        enabled: true,
      },
      line_items: items.map((i) => ({
        price_data: {
          currency: "eur",
          product_data: { name: i.title.trim() },
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
    console.error("Checkout error:", e);
    return Response.json({ error: "Checkout failed" }, { status: 500 });
  }
}
