"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/store/cart";

export default function SuccessPage() {
  const { clear } = useCart();

  useEffect(() => {
    clear();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className="min-h-screen flex flex-col">
      {/* Dark top section */}
      <div className="bg-dark flex-1 flex flex-col items-center justify-center px-4 py-16 sm:py-20 text-center relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-gold/5 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-gold/5 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-lg mx-auto">
          {/* Animated checkmark */}
          <div className="flex items-center justify-center mb-8">
            <div className="w-24 h-24 rounded-full border-4 border-gold/30 flex items-center justify-center relative">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-gold">
                <polyline
                  points="8 26 18 36 40 14"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    strokeDasharray: 100,
                    strokeDashoffset: 0,
                    animation: "drawCheck 0.8s ease 0.3s both",
                  }}
                />
              </svg>
              {/* Pulsing ring */}
              <div className="absolute inset-0 rounded-full border-2 border-gold/20 animate-ping" />
            </div>
          </div>

          <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-gold mb-4">
            Commande confirmée !
          </h1>
          <p className="text-cream/70 text-base sm:text-lg mb-10">
            Merci pour votre confiance. Nous avons bien reçu votre commande.
          </p>

          {/* Steps */}
          <div className="grid gap-4 text-left mb-10">
            {[
              { n: "1", title: "Email de confirmation envoyé", desc: "Vérifiez votre boîte de réception (et les spams)." },
              { n: "2", title: "Nous vous contactons sous 24h", desc: "Notre équipe valide et prépare votre commande." },
              { n: "3", title: "Livraison organisée ensemble", desc: "Nous vous informons dès l'expédition de votre colis." },
            ].map((step) => (
              <div key={step.n} className="flex items-start gap-4 bg-white/5 rounded-2xl p-4 border border-gold/15">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold text-dark font-bold text-sm flex items-center justify-center">
                  {step.n}
                </div>
                <div>
                  <p className="font-semibold text-cream text-sm">{step.title}</p>
                  <p className="text-cream/50 text-xs mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/boutique"
            className="inline-flex items-center gap-2 bg-gold text-dark font-bold px-8 py-4 rounded-full text-base hover:bg-gold-light hover:scale-105 transition-all duration-300"
          >
            Retourner à la boutique →
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes drawCheck {
          from { stroke-dashoffset: 100; }
          to   { stroke-dashoffset: 0; }
        }
      `}</style>
    </main>
  );
}
