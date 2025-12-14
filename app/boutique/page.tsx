"use client";

import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function ShopPage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-orange-50/30 via-white to-orange-50/20">
      {/* header and hero removed */}

      <div className="relative mx-auto max-w-7xl px-3 sm:px-4 lg:px-6 py-8 sm:py-12 lg:py-16">
        {/* Compteur de produits */}
        <div className="flex items-center justify-between mb-6 sm:mb-8 px-1">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="h-1 w-12 sm:w-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full" />
            <p className="text-sm sm:text-base font-bold text-gray-700">
              {products.length} produits disponibles
            </p>
          </div>
          
          {/* Tri (optionnel) */}
          <button className="flex items-center gap-2 text-sm sm:text-base font-semibold text-gray-600 hover:text-orange-600 transition-colors">
            <span>Trier</span>
            <span className="text-xs">▼</span>
          </button>
        </div>

        {/* Grille de produits */}
        <div className="grid gap-4 sm:gap-5 lg:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, idx) => (
            <div 
              key={product.id}
              className="animate-fadeIn"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

       
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </main>
  );
}