"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/store/cart";

function formatEUR(priceCents: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(
    priceCents / 100
  );
}

export default function CartPage() {
  const cart = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.items.map((i) => ({
            title: i.title,
            qty: i.qty,
            priceCents: i.priceCents,
          })),
        }),
      });
      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
      } else {
        alert("Erreur lors du paiement. Veuillez réessayer.");
        setIsCheckingOut(false);
      }
    } catch {
      alert("Une erreur est survenue.");
      setIsCheckingOut(false);
    }
  };

  return (
    <main className="bg-cream min-h-screen py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Page title */}
        <div className="flex items-center gap-3 mb-8 sm:mb-10">
          <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-dark">Mon Panier</h1>
          {cart.items.length > 0 && (
            <span className="flex items-center justify-center h-7 w-7 rounded-full bg-gold text-dark text-sm font-bold">
              {cart.count}
            </span>
          )}
        </div>

        {cart.items.length === 0 ? (
          /* ── Empty cart ── */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-8">
              <svg width="96" height="96" viewBox="0 0 96 96" fill="none" className="text-gold/20 mx-auto">
                <path d="M24 8L12 24v56a8 8 0 008 8h56a8 8 0 008-8V24L72 8H24Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="12" y1="24" x2="84" y2="24" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                <path d="M64 40a16 16 0 01-32 0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-dark mb-3">
              Votre panier est vide
            </h2>
            <p className="text-dark/50 text-base mb-8 max-w-sm">
              Découvrez nos produits africains 100% naturels et ajoutez vos favoris.
            </p>
            <Link
              href="/boutique"
              className="inline-flex items-center gap-2 bg-gold text-dark font-bold px-8 py-4 rounded-full text-base hover:bg-gold-light hover:scale-105 transition-all duration-300"
            >
              Découvrir nos produits →
            </Link>
          </div>
        ) : (
          /* ── Cart with items ── */
          <div className="grid gap-8 lg:grid-cols-3 lg:items-start">

            {/* LEFT — Cart items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-cream-dark hover:border-gold/20 transition-colors"
                >
                  {/* Image */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-cream-dark flex-shrink-0">
                    {item.image ? (
                      <Image src={item.image} alt={item.title} fill className="object-cover" sizes="80px" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-2xl"
                        style={{ background: "linear-gradient(135deg, #111111, #1A1A1A)" }}>
                        <span className="font-playfair text-2xl text-gold/60">
                          {item.title.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-playfair font-semibold text-dark text-base leading-tight mb-0.5">
                      {item.title}
                    </p>
                    <p className="text-dark/50 text-sm">
                      {formatEUR(item.priceCents)} / unité
                    </p>
                    <p className="font-bold text-dark text-base mt-0.5">
                      {formatEUR(item.priceCents * item.qty)}
                    </p>
                  </div>

                  {/* Qty controls */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center rounded-full border-2 border-gold/30 overflow-hidden">
                      <button
                        onClick={() => cart.dec(item.id)}
                        className="w-9 h-9 flex items-center justify-center text-dark/60 bg-gold/10 hover:bg-gold hover:text-dark transition-colors font-bold"
                        aria-label="Diminuer"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-bold text-dark text-sm">{item.qty}</span>
                      <button
                        onClick={() => cart.inc(item.id)}
                        className="w-9 h-9 flex items-center justify-center text-dark/60 bg-gold/10 hover:bg-gold hover:text-dark transition-colors font-bold"
                        aria-label="Augmenter"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => cart.remove(item.id)}
                      className="w-9 h-9 flex items-center justify-center rounded-full border-2 border-red-200 text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
                      aria-label="Retirer"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT — Order summary (sticky) */}
            <aside className="lg:sticky lg:top-28">
              <div className="bg-white rounded-2xl border-2 border-gold/20 shadow-lg p-6">
                <h2 className="font-playfair text-xl font-bold text-dark mb-5">Récapitulatif</h2>

                {/* Lines */}
                <div className="space-y-3 mb-5 pb-5 border-b border-cream-dark">
                  <div className="flex justify-between text-sm">
                    <span className="text-dark/60">Sous-total</span>
                    <span className="font-semibold text-dark">{formatEUR(cart.totalCents)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-dark/60">Livraison</span>
                    <span className="text-dark/50 italic">Calculée à la commande</span>
                  </div>
                </div>

                {/* Total — gold bg badge for contrast */}
                <div className="flex justify-between items-center mb-6 bg-gold rounded-2xl px-4 py-3">
                  <span className="font-bold text-dark text-base">Total</span>
                  <span className="font-playfair font-black text-3xl text-dark">{formatEUR(cart.totalCents)}</span>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-gold text-dark font-bold py-4 rounded-full text-base hover:bg-gold-light hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 shadow-lg shadow-gold/20"
                >
                  {isCheckingOut ? (
                    <>
                      <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                      </svg>
                      Chargement...
                    </>
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                        <line x1="1" y1="10" x2="23" y2="10"/>
                      </svg>
                      Passer au paiement
                    </>
                  )}
                </button>

                {/* Clear cart */}
                <button
                  onClick={() => cart.clear()}
                  className="mt-3 w-full text-sm text-red-400 hover:text-red-600 transition-colors py-2"
                >
                  Vider le panier
                </button>

                {/* Security */}
                <div className="mt-5 pt-5 border-t border-cream-dark space-y-2">
                  <div className="flex items-center justify-center gap-2 text-xs text-dark/40">
                    <span>🔒</span>
                    <span>Paiement sécurisé Stripe</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs text-dark/40">
                    <span>✅</span>
                    <span>Connexion SSL chiffrée</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
