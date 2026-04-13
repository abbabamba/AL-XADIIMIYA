"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/data/products";
import { useCart } from "@/store/cart";

function formatEUR(priceCents: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(
    priceCents / 100
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const cart = useCart();
  const [added, setAdded] = useState(false);

  const outOfStock = product.stock === 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (outOfStock) return;
    cart.add({
      id: product.id,
      title: product.title,
      priceCents: product.price_cents,
      image: product.image_url ?? undefined,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const firstLetter = product.title.charAt(0).toUpperCase();

  return (
    <div className="group relative flex flex-col rounded-2xl overflow-hidden bg-white shadow-md hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 border border-cream-dark hover:border-gold/30">
      {/* Badges */}
      {product.is_popular && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-gold text-dark text-xs font-bold px-3 py-1 rounded-full shadow">
          🔥 POPULAIRE
        </div>
      )}
      {outOfStock && (
        <div className="absolute top-3 right-3 z-10 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
          Rupture de stock
        </div>
      )}

      {/* Image area */}
      <Link href={`/boutique/${product.id}`} className="block relative aspect-square overflow-hidden">
        {product.image_url && product.image_url.trim() !== "" ? (
          <Image
            src={product.image_url}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center relative"
            style={{ background: "linear-gradient(135deg, #111111, #1A1A1A)" }}>
            <span className="font-playfair text-7xl font-bold text-gold/60 select-none">
              {firstLetter}
            </span>
            <span className="absolute bottom-3 right-3 text-2xl opacity-40">📦</span>
          </div>
        )}

        {/* Hover overlay — "Voir le produit" */}
        <div className="absolute inset-0 flex items-center justify-center bg-dark/75 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="font-semibold text-gold text-sm border border-gold/50 rounded-full px-5 py-2 hover:bg-gold hover:text-dark transition-colors">
            Voir le produit
          </span>
        </div>
      </Link>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-4">
        {/* Category */}
        {product.category && (
          <span className="inline-flex w-fit bg-gold/20 text-dark text-[10px] uppercase tracking-widest mb-2 font-bold px-2 py-0.5 rounded-full">
            {product.category}
          </span>
        )}

        {/* Title */}
        <Link href={`/boutique/${product.id}`}>
          <h3 className="font-playfair text-dark text-lg font-semibold leading-snug mb-1 hover:text-dark-soft transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-1 leading-relaxed">
          {product.description}
        </p>

        {/* Footer row */}
        <div className="flex items-center justify-between gap-3 mt-auto pt-3 border-t border-cream-dark">
          {/* Price — dark text on white card for contrast */}
          <span className="font-black text-dark text-xl">
            {formatEUR(product.price_cents)}
          </span>

          {/* Add to cart */}
          <button
            onClick={handleAdd}
            disabled={outOfStock}
            aria-label="Ajouter au panier"
            className={`flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 shadow-md hover:shadow-lg
              ${outOfStock
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : added
                  ? "bg-green-500 text-white scale-110"
                  : "bg-dark text-gold hover:bg-gold hover:text-dark hover:scale-110"
              }`}
          >
            {added ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
