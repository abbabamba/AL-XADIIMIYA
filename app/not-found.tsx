import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Page introuvable — 404" };

export default function NotFound() {
  return (
    <main className="min-h-screen bg-dark flex flex-col items-center justify-center px-4 text-center relative overflow-hidden">
      {/* Blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-gold/5 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-gold/5 blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-lg mx-auto">
        {/* Giant 404 */}
        <p
          className="font-playfair font-bold leading-none mb-4 select-none"
          style={{
            fontSize: "clamp(6rem, 20vw, 14rem)",
            background: "linear-gradient(135deg, #D4A843, #E8C97A)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          404
        </p>

        <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-cream mb-4">
          Page introuvable
        </h1>
        <p className="text-cream/50 text-base mb-10 max-w-sm mx-auto">
          Cette page n&apos;existe pas ou a été déplacée. Revenez à l&apos;accueil ou explorez la boutique.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-gold text-dark font-bold px-8 py-4 rounded-full text-base hover:bg-gold-light hover:scale-105 transition-all duration-300"
          >
            Accueil
          </Link>
          <Link
            href="/boutique"
            className="inline-flex items-center justify-center gap-2 border-2 border-gold text-gold font-bold px-8 py-4 rounded-full text-base hover:bg-gold hover:text-dark transition-all duration-300"
          >
            Boutique
          </Link>
        </div>
      </div>
    </main>
  );
}
