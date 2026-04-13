"use client";

import { useState } from "react";
import { useCart } from "@/store/cart";
import type { Product } from "@/data/products";

export default function AddToCartButton({ product }: { product: Product }) {
  const cart = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const outOfStock = product.stock === 0;

  const handleAdd = () => {
    if (outOfStock) return;
    cart.add({
      id: product.id,
      title: product.title,
      priceCents: product.price_cents,
      image: product.image_url ?? undefined,
    });
    for (let i = 1; i < qty; i++) {
      cart.inc(product.id);
    }
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setQty(1);
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Quantity selector */}
      {!outOfStock && (
        <div className="flex items-center gap-4">
          <span className="text-sm text-dark/60 font-medium">Quantité</span>
          <div className="flex items-center gap-0 rounded-full border-2 border-gold/30 overflow-hidden">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-10 h-10 flex items-center justify-center text-dark/60 bg-gold/15 hover:bg-gold hover:text-dark transition-colors font-bold text-lg"
              aria-label="Diminuer la quantité"
            >
              −
            </button>
            <span className="w-10 text-center font-bold text-dark text-base">
              {qty}
            </span>
            <button
              onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
              className="w-10 h-10 flex items-center justify-center text-dark/60 bg-gold/15 hover:bg-gold hover:text-dark transition-colors font-bold text-lg"
              aria-label="Augmenter la quantité"
            >
              +
            </button>
          </div>
        </div>
      )}

      {/* Add to cart CTA */}
      <button
        onClick={handleAdd}
        disabled={outOfStock || added}
        className={`w-full rounded-full py-4 font-bold text-lg transition-all duration-300
          ${outOfStock
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : added
              ? "bg-green-500 text-white scale-[1.02] shadow-lg shadow-green-200"
              : "bg-gold text-dark hover:bg-gold-light hover:scale-[1.02] shadow-lg shadow-gold/30 animate-pulse-gold"
          }`}
      >
        {outOfStock
          ? "Rupture de stock"
          : added
            ? "✓ Ajouté au panier !"
            : "Ajouter au panier"}
      </button>
    </div>
  );
}
