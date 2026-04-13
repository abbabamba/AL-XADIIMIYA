"use client";

import { useState, useEffect, useMemo } from "react";
import { getProducts } from "@/data/products";
import type { Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";

type SortOption = "default" | "price-asc" | "price-desc" | "name-asc";

const SORT_LABELS: Record<SortOption, string> = {
  default: "Par défaut",
  "price-asc": "Prix croissant",
  "price-desc": "Prix décroissant",
  "name-asc": "Nom A→Z",
};

const CATEGORIES = ["Tous", "cereales", "boissons", "superfoods", "confitures", "condiments", "sirops", "desserts", "general"];

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tous");
  const [sort, setSort] = useState<SortOption>("default");

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) => p.title.toLowerCase().includes(q) || (p.description ?? "").toLowerCase().includes(q)
      );
    }

    if (category !== "Tous") {
      result = result.filter((p) => p.category === category);
    }

    switch (sort) {
      case "price-asc":  result.sort((a, b) => a.price_cents - b.price_cents); break;
      case "price-desc": result.sort((a, b) => b.price_cents - a.price_cents); break;
      case "name-asc":   result.sort((a, b) => a.title.localeCompare(b.title, "fr")); break;
    }

    return result;
  }, [products, search, category, sort]);

  return (
    <main>
      {/* Hero Banner */}
      <section className="relative bg-dark py-16 sm:py-20 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold/5 blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-gold/5 blur-[80px]" />
        </div>
        <div className="relative z-10 text-center px-4">
          <p className="text-xs tracking-[0.4em] text-gold/60 uppercase mb-3">Al Xadiimiya Services</p>
          <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-cream mb-4">
            Notre Boutique
          </h1>
          <p className="font-playfair italic text-gold/70 text-lg">
            "La qualité, notre priorité"
          </p>
          {/* Gold wave divider */}
          <div className="mt-10 overflow-hidden h-8 pointer-events-none">
            <svg viewBox="0 0 1200 48" preserveAspectRatio="none" className="w-full h-full">
              <path
                d="M0,24 C200,48 400,0 600,24 C800,48 1000,0 1200,24 L1200,48 L0,48 Z"
                fill="#FAFAF7"
              />
            </svg>
          </div>
        </div>
      </section>

      <div className="bg-cream min-h-screen">
        {/* Sticky filter bar */}
        <div className="sticky top-16 sm:top-20 z-30 bg-white/95 backdrop-blur-sm border-b border-cream-dark shadow-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
            {/* Row 1: Search + Sort */}
            <div className="flex flex-col sm:flex-row gap-3 mb-3">
              {/* Search */}
              <div className="relative flex-1">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-dark/40" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                </svg>
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-full border-2 border-gold/20 bg-cream focus:outline-none focus:border-gold text-dark text-sm placeholder:text-dark/40 transition-colors"
                />
              </div>

              {/* Sort */}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="px-4 py-2.5 rounded-full border-2 border-gold/20 bg-cream focus:outline-none focus:border-gold text-dark text-sm transition-colors cursor-pointer"
              >
                {(Object.keys(SORT_LABELS) as SortOption[]).map((o) => (
                  <option key={o} value={o}>{SORT_LABELS[o]}</option>
                ))}
              </select>

              {/* Products count */}
              <div className="flex items-center text-sm text-dark/50 whitespace-nowrap px-2">
                {loading ? "Chargement…" : `${filtered.length} produit${filtered.length !== 1 ? "s" : ""}`}
              </div>
            </div>

            {/* Row 2: Category pills */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200
                    ${category === cat
                      ? "bg-gold text-dark border-gold"
                      : "border-dark/30 text-dark/70 hover:bg-gold hover:text-dark hover:border-gold"
                    }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          {/* Loading skeleton */}
          {loading && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-2xl bg-white animate-pulse overflow-hidden">
                  <div className="aspect-square bg-cream-dark" />
                  <div className="p-4 space-y-3">
                    <div className="h-3 w-16 bg-cream-dark rounded-full" />
                    <div className="h-5 w-3/4 bg-cream-dark rounded-full" />
                    <div className="h-3 w-full bg-cream-dark rounded-full" />
                    <div className="h-3 w-2/3 bg-cream-dark rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Product grid */}
          {!loading && filtered.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-20 h-20 rounded-full bg-cream-dark flex items-center justify-center text-4xl mb-6">
                🔍
              </div>
              <h3 className="font-playfair text-2xl font-bold text-dark mb-2">Aucun produit trouvé</h3>
              <p className="text-dark/50 text-sm mb-6">Essayez de modifier votre recherche ou vos filtres.</p>
              <button
                onClick={() => { setSearch(""); setCategory("Tous"); }}
                className="px-6 py-3 bg-gold text-dark rounded-full font-semibold text-sm hover:bg-gold-light transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
