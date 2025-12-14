"use client";

import Image from "next/image";
import type { Product } from "@/data/products";
import { useCart } from "@/store/cart";
import { useState } from "react";

function formatEUR(priceCents: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(
    priceCents / 100
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const cart = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    cart.add({
      id: product.id,
      title: product.title,
      priceCents: product.priceCents,
      image: product.image,
    });
    
    // Animation de feedback
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="group relative h-full flex flex-col rounded-2xl sm:rounded-3xl border-2 border-orange-200/50 bg-white shadow-md hover:shadow-2xl hover:border-orange-400 transition-all duration-300 overflow-hidden">
      {/* Badge "Nouveau" ou "Populaire" (optionnel) */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-3 py-1.5 shadow-lg">
        <span className="text-xs font-bold text-white tracking-wide">🔥 POPULAIRE</span>
      </div>

      {/* Image du produit */}
      <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100/50">
        <Image 
          src={product.image} 
          alt={product.title} 
          fill 
          className="object-cover group-hover:scale-110 transition-transform duration-500" 
        />
        
        {/* Overlay au hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Contenu */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        {/* Titre */}
        <h3 className="font-black text-base sm:text-lg text-gray-900 leading-tight mb-2 group-hover:text-orange-700 transition-colors">
          {product.title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-2 mb-4 flex-1">
          {product.description}
        </p>

        {/* Prix et bouton */}
        <div className="flex items-center justify-between gap-3 mt-auto">
          {/* Prix */}
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium">Prix</span>
            <span className="text-xl sm:text-2xl font-black text-orange-600">
              {formatEUR(product.priceCents)}
            </span>
          </div>

          {/* Bouton d'ajout */}
          <button
            onClick={handleAddToCart}
            className={`relative flex items-center justify-center h-12 sm:h-14 px-5 sm:px-6 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 ${
              isAdded 
                ? 'bg-green-500 text-white' 
                : 'bg-gradient-to-r from-orange-600 to-orange-500 text-white hover:from-orange-700 hover:to-orange-600'
            }`}
            aria-label="Ajouter au panier"
          >
            {isAdded ? (
              <span className="flex items-center gap-2">
                <span className="text-lg">✓</span>
                <span className="hidden sm:inline">Ajouté</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span className="text-xl">+</span>
                <span className="hidden sm:inline">Ajouter</span>
              </span>
            )}
          </button>
        </div>

        {/* Barre de confiance */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <span>✅</span>
            <span className="font-medium">100% Naturel</span>
          </div>
          <div className="h-1 w-1 rounded-full bg-gray-300" />
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <span>🚚</span>
            <span className="font-medium">Livraison rapide</span>
          </div>
        </div>
      </div>

      {/* Effet de brillance au hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>
    </div>
  );
}