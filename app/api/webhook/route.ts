import Stripe from "stripe";
import { headers } from "next/headers";
import { transporter } from "@/lib/mailer";
import { supabaseAdmin } from "@/lib/supabase-admin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = headers();
  const signature = (await headersList).get("stripe-signature");

  if (!signature) {
    console.error("Stripe signature manquante");
    return new Response("Signature manquante", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err) {
    console.error("Erreur vérification webhook :", err);
    return new Response("Webhook error", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const customerEmail = session.customer_details?.email ?? null;
    const customerName = session.customer_details?.name ?? null;
    const customerPhone = session.customer_details?.phone ?? null;
    const amountTotal = session.amount_total ?? 0;
    const currency = session.currency?.toUpperCase() ?? "EUR";
    const address = session.customer_details?.address;

    // ── Fetch line items ──────────────────────────────────────────────────────
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

    // ── Save order to Supabase ────────────────────────────────────────────────
    try {
      const { data: order, error: orderError } = await supabaseAdmin
        .from("orders")
        .insert({
          stripe_session_id: session.id,
          customer_name: customerName,
          customer_email: customerEmail ?? "unknown@unknown.com",
          customer_phone: customerPhone,
          shipping_address: address
            ? {
                line1: address.line1,
                line2: address.line2,
                city: address.city,
                postal_code: address.postal_code,
                country: address.country,
              }
            : null,
          status: "paid",
          total_cents: amountTotal,
        })
        .select("id")
        .single();

      if (orderError) {
        console.error("Erreur insertion order :", orderError.message);
      } else if (order) {
        const orderItemsPayload = lineItems.data.map((item) => ({
          order_id: order.id,
          product_id: null,
          title: item.description ?? "Produit",
          price_cents: item.price?.unit_amount ?? 0,
          quantity: item.quantity ?? 1,
          image_url: null,
        }));

        const { error: itemsError } = await supabaseAdmin
          .from("order_items")
          .insert(orderItemsPayload);

        if (itemsError) {
          console.error("Erreur insertion order_items :", itemsError.message);
        } else {
          console.log(`✅ Commande ${order.id} enregistrée dans Supabase`);
        }
      }
    } catch (dbErr) {
      console.error("Erreur DB inattendue :", dbErr);
    }

    // ── Send confirmation email to customer ───────────────────────────────────
    if (customerEmail) {
      try {
        const itemsRowsHtml = lineItems.data
          .map(
            (item) => `
            <tr style="border-bottom:1px solid #eee">
              <td style="padding:10px 0">${item.quantity}x ${item.description ?? "Produit"}</td>
              <td style="padding:10px 0;text-align:right">${((item.amount_total ?? 0) / 100).toFixed(2)}€</td>
            </tr>`
          )
          .join("");

        const addressHtml = address
          ? `${address.line1 ?? ""}${address.line2 ? "<br/>" + address.line2 : ""}<br/>${address.postal_code ?? ""} ${address.city ?? ""}<br/>${address.country ?? ""}`
          : "Non renseignée";

        await transporter.sendMail({
          from: `"Al Xadiimiya Services" <${process.env.GMAIL_USER}>`,
          to: customerEmail,
          subject: "✅ Commande confirmée — Al Xadiimiya Services",
          html: `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif">
  <div style="max-width:600px;margin:0 auto;background:white">
    <div style="background:#111111;padding:30px;text-align:center">
      <h1 style="color:#D4A843;margin:0;font-size:28px">Al Xadiimiya</h1>
      <p style="color:#D4A843;margin:5px 0 0;font-size:13px;letter-spacing:2px">SERVICES</p>
    </div>
    <div style="padding:40px 30px">
      <h2 style="color:#111111">Merci pour votre commande ! 🎉</h2>
      <p>Bonjour <strong>${customerName ?? "—"}</strong>,</p>
      <p>Votre paiement a été confirmé. Nous vous contacterons sous <strong>24h</strong> pour organiser la livraison.</p>
      <h3 style="color:#D4A843;border-bottom:2px solid #D4A843;padding-bottom:8px">Votre commande</h3>
      <table style="width:100%;border-collapse:collapse">
        ${itemsRowsHtml}
        <tr>
          <td style="padding:15px 0;font-weight:bold;font-size:18px">Total</td>
          <td style="padding:15px 0;font-weight:bold;font-size:18px;text-align:right;color:#D4A843">${(amountTotal / 100).toFixed(2)} ${currency}</td>
        </tr>
      </table>
      <h3 style="color:#D4A843;border-bottom:2px solid #D4A843;padding-bottom:8px">Adresse de livraison</h3>
      <p style="background:#f9f9f9;padding:15px;border-radius:8px">${addressHtml}</p>
      <div style="background:#FFF8E7;border-left:4px solid #D4A843;padding:15px;margin-top:20px;border-radius:0 8px 8px 0">
        <p style="margin:0"><strong>Une question ?</strong></p>
        <p style="margin:5px 0">📧 alxadiimiyaservices@gmail.com</p>
        <p style="margin:5px 0">📱 +33 7 51 36 29 17</p>
      </div>
    </div>
    <div style="background:#111111;padding:20px;text-align:center">
      <p style="color:#D4A843;margin:0;font-size:12px">© Al Xadiimiya Services — Produits africains 100% naturels</p>
      <p style="color:#888;margin:5px 0 0;font-size:11px">6 rue Gabriel Faure 60200 Compiègne</p>
    </div>
  </div>
</body>
</html>`,
        });
        console.log(`✅ Email de confirmation envoyé au client : ${customerEmail}`);
      } catch (emailErr) {
        console.error("Erreur envoi email client :", emailErr);
      }
    }

    // ── Notify owner via email ────────────────────────────────────────────────
    const ownerEmail = process.env.OWNER_EMAIL;
    if (ownerEmail) {
      try {
        const itemsOwnerHtml = lineItems.data
          .map(
            (item) => `
            <tr style="border-bottom:1px solid #eee">
              <td style="padding:8px 0">${item.quantity}x ${item.description ?? "Produit"}</td>
              <td style="padding:8px 0;text-align:right">${((item.price?.unit_amount ?? 0) / 100).toFixed(2)}€</td>
            </tr>`
          )
          .join("");

        const addressOwnerText = address
          ? `${address.line1 ?? ""}${address.line2 ? ", " + address.line2 : ""}, ${address.postal_code ?? ""} ${address.city ?? ""}, ${address.country ?? ""}`
          : "Non renseignée";

        await transporter.sendMail({
          from: `"Al Xadiimiya Services" <${process.env.GMAIL_USER}>`,
          to: ownerEmail,
          subject: `🛍️ Nouvelle commande — ${customerName ?? customerEmail}`,
          html: `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif">
  <div style="max-width:600px;margin:0 auto;background:white;padding:30px">
    <h2 style="color:#111111;border-bottom:2px solid #D4A843;padding-bottom:10px">
      🛍️ Nouvelle commande reçue
    </h2>
    <h3 style="color:#D4A843">Client</h3>
    <p>👤 <strong>Nom :</strong> ${customerName ?? "—"}</p>
    <p>📧 <strong>Email :</strong> ${customerEmail ?? "—"}</p>
    <p>📱 <strong>Téléphone :</strong> ${customerPhone ?? "Non renseigné"}</p>
    <h3 style="color:#D4A843">Articles</h3>
    <table style="width:100%;border-collapse:collapse">
      ${itemsOwnerHtml}
      <tr>
        <td style="padding:12px 0;font-weight:bold;font-size:16px;border-top:2px solid #D4A843">💰 Total</td>
        <td style="padding:12px 0;font-weight:bold;font-size:16px;text-align:right;border-top:2px solid #D4A843;color:#D4A843">${(amountTotal / 100).toFixed(2)} ${currency}</td>
      </tr>
    </table>
    <h3 style="color:#D4A843">📍 Adresse de livraison</h3>
    <p style="background:#f9f9f9;padding:15px;border-radius:8px">${addressOwnerText}</p>
    <p style="color:#888;font-size:12px;margin-top:20px;border-top:1px solid #eee;padding-top:10px">
      Session Stripe : ${session.id}<br/>
      Date : ${new Date().toLocaleString("fr-FR")}
    </p>
  </div>
</body>
</html>`,
        });
        console.log(`✅ Email propriétaire envoyé à : ${ownerEmail}`);
      } catch (emailErr) {
        console.error("Erreur envoi email propriétaire :", emailErr);
      }
    }
  }

  return new Response("OK", { status: 200 });
}
