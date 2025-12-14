"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/store/cart";
import { useState } from "react";

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
        alert("Erreur checkout. Vérifie Stripe et tes variables .env.local");
        setIsCheckingOut(false);
      }
    } catch (error) {
      alert("Une erreur est survenue");
      setIsCheckingOut(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-orange-50/30 via-white to-orange-50/20">
      {/* Blobs décoratifs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-gradient-to-br from-orange-400/15 to-orange-600/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-gradient-to-tr from-yellow-400/10 to-orange-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-3 sm:px-4 lg:px-6 py-8 sm:py-12 lg:py-16">
        {/* En-tête */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <span className="text-3xl sm:text-4xl">🛒</span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900">
                Votre Panier
              </h1>
            </div>
            <p className="text-sm sm:text-base text-gray-600">
              {cart.items.length === 0 ? (
                "Votre panier est vide"
              ) : (
                <span>
                  <span className="font-bold text-orange-600">{cart.items.length}</span> article{cart.items.length > 1 ? 's' : ''} • 
                  <span className="font-bold text-orange-600 ml-1">{cart.items.reduce((acc, i) => acc + i.qty, 0)}</span> produit{cart.items.reduce((acc, i) => acc + i.qty, 0) > 1 ? 's' : ''}
                </span>
              )}
            </p>
          </div>

          <Link 
            href="/boutique" 
            className="group inline-flex items-center gap-2 rounded-xl sm:rounded-2xl border-2 border-orange-300 bg-white px-5 sm:px-6 py-2.5 sm:py-3 font-bold text-sm sm:text-base text-orange-700 hover:bg-orange-50 hover:border-orange-400 hover:scale-105 transition-all duration-300 shadow-sm"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span>Continuer les achats</span>
          </Link>
        </div>

        {cart.items.length === 0 ? (
          /* Panier vide */
          <div className="flex flex-col items-center justify-center py-16 sm:py-20 lg:py-24">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-orange-600/20 blur-3xl rounded-full" />
              <div className="relative bg-gradient-to-br from-orange-100 to-orange-50 rounded-full p-8 sm:p-10 shadow-xl border border-orange-200">
                <span className="text-6xl sm:text-7xl md:text-8xl">🛒</span>
              </div>
            </div>
            
            <h2 className="mt-8 text-2xl sm:text-3xl font-black text-gray-900">
              Votre panier est vide
            </h2>
            <p className="mt-3 text-base sm:text-lg text-gray-600 text-center max-w-md">
              Découvrez nos produits authentiques et ajoutez vos favoris au panier !
            </p>

            <Link
              href="/boutique"
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-600 to-orange-500 px-8 py-4 text-white font-bold text-base sm:text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <span>Découvrir la boutique</span>
              <span>→</span>
            </Link>
          </div>
        ) : (
          /* Panier avec produits */
          <div className="grid gap-6 lg:gap-8 lg:grid-cols-3">
            {/* Liste des produits */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
              {cart.items.map((item, idx) => (
                <div 
                  key={item.id} 
                  className="group relative flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-2xl sm:rounded-3xl border-2 border-orange-200/50 bg-white p-4 sm:p-5 shadow-md hover:shadow-xl hover:border-orange-400 transition-all duration-300"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  {/* Image produit */}
                  <div className="relative h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-orange-100 to-orange-50 flex-shrink-0 shadow-md">
                    {item.image ? (
                      <Image 
                        src={item.image} 
                        alt={item.title} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-3xl">📦</div>
                    )}
                  </div>

                  {/* Info produit */}
                  <div className="min-w-0 flex-1">
                    <h3 className="font-black text-base sm:text-lg text-gray-900 mb-1 group-hover:text-orange-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-2">
                      Prix unitaire: <span className="font-bold text-orange-600">{formatEUR(item.priceCents)}</span>
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-gray-700">
                      Sous-total: <span className="text-orange-600">{formatEUR(item.priceCents * item.qty)}</span>
                    </p>
                  </div>

                  {/* Contrôles quantité */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl border-2 border-orange-200 bg-orange-50 p-1 sm:p-1.5 shadow-sm">
                      <button
                        className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-white border border-orange-300 font-bold text-orange-700 hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all duration-300 flex items-center justify-center shadow-sm hover:shadow-md"
                        onClick={() => cart.dec(item.id)}
                      >
                        −
                      </button>
                      <span className="w-8 sm:w-10 text-center font-black text-base sm:text-lg text-gray-900">
                        {item.qty}
                      </span>
                      <button
                        className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-white border border-orange-300 font-bold text-orange-700 hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all duration-300 flex items-center justify-center shadow-sm hover:shadow-md"
                        onClick={() => cart.inc(item.id)}
                      >
                        +
                      </button>
                    </div>

                    {/* Bouton retirer */}
                    <button
                      className="rounded-xl sm:rounded-2xl border-2 border-red-200 bg-white px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-red-600 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300 shadow-sm hover:shadow-md"
                      onClick={() => cart.remove(item.id)}
                    >
                      🗑️ <span className="hidden sm:inline">Retirer</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Récapitulatif */}
            <aside className="lg:sticky lg:top-8 h-fit">
              <div className="rounded-2xl sm:rounded-3xl border-2 border-orange-200 bg-white p-5 sm:p-6 lg:p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
                    <span className="text-2xl">💰</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                    Récapitulatif
                  </h2>
                </div>

                {/* Détails */}
                <div className="space-y-3 mb-6 pb-6 border-b-2 border-orange-100">
                  <div className="flex items-center justify-between text-sm sm:text-base">
                    <span className="text-gray-600">Sous-total</span>
                    <span className="font-bold text-gray-900">{formatEUR(cart.totalCents)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm sm:text-base">
                    <span className="text-gray-600">Livraison</span>
                    <span className="font-bold text-green-600">Gratuite</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between mb-6 p-4 rounded-2xl bg-gradient-to-r from-orange-50 to-orange-100">
                  <span className="text-lg sm:text-xl font-bold text-gray-900">Total</span>
                  <span className="text-2xl sm:text-3xl font-black text-orange-600">
                    {formatEUR(cart.totalCents)}
                  </span>
                </div>

                {/* Bouton paiement */}
                <button
                  className="w-full rounded-xl sm:rounded-2xl bg-gradient-to-r from-orange-600 to-orange-500 px-6 py-4 text-white font-black text-base sm:text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin">⏳</span>
                      <span>Chargement...</span>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <span>Passer au paiement</span>
                      <span>🔒</span>
                    </span>
                  )}
                </button>

                {/* Bouton vider */}
                <button
                  className="mt-3 w-full rounded-xl sm:rounded-2xl border-2 border-gray-300 bg-white px-6 py-3 text-gray-700 font-bold text-sm sm:text-base hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
                  onClick={() => {
                  
                  }}
                >
                  Vider le panier
                </button>

                {/* Badge de sécurité */}
                <div className="mt-6 flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-600">
                  <span>🔒</span>
                  <span>Paiement 100% sécurisé</span>
                </div>

                {/* Badges confiance */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {[
                    { icon: "✅", text: "Qualité garantie" },
                    { icon: "🚚", text: "Livraison rapide" }
                  ].map((badge) => (
                    <div 
                      key={badge.text}
                      className="flex items-center gap-1.5 rounded-xl bg-orange-50 border border-orange-200 px-2 py-2 text-xs font-semibold text-gray-700"
                    >
                      <span>{badge.icon}</span>
                      <span>{badge.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}