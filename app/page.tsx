import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

export default function HomePage() {
  const preview = products.slice(0, 6);

  return (
    <main className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
      {/* HERO SECTION - Design moderne avec animations subtiles */}
      <section className="relative min-h-[85vh] flex items-center py-8 sm:py-12 lg:py-16">
        {/* Blobs d'arrière-plan animés */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-gradient-to-br from-orange-400/30 to-orange-600/20 blur-3xl animate-pulse" />
          <div className="absolute top-1/2 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr from-orange-300/25 to-yellow-400/15 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute -bottom-32 right-1/4 h-72 w-72 rounded-full bg-gradient-to-bl from-orange-500/20 to-red-400/15 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 grid gap-8 lg:grid-cols-2 lg:items-center w-full">
          {/* Contenu gauche */}
          <div className="space-y-6 sm:space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 sm:gap-2.5 rounded-full bg-gradient-to-r from-orange-100 to-orange-50 border border-orange-200/60 px-3 sm:px-4 py-1.5 sm:py-2 shadow-sm">
              <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-orange-600"></span>
              </span>
              <span className="text-[10px] sm:text-xs md:text-sm font-bold text-orange-800 tracking-wide">
                100% Africain • Naturel • Authentique
              </span>
            </div>

            {/* Titre principal */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-gray-900 leading-tight">
                AL-XADIIMIYA
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-500 mt-1 sm:mt-2">
                  SERVICES
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-600 max-w-xl">
                Café Touba, céréales, fruits secs, sirops et confitures. Une sélection
                soignée, un goût vrai, une qualité qui se remarque dès la première commande.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
              <Link
                href="/boutique"
                className="group relative rounded-xl sm:rounded-2xl bg-gradient-to-r from-orange-600 to-orange-500 px-6 sm:px-8 py-3 sm:py-4 text-white text-center font-bold text-base sm:text-lg shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 hover:scale-105 transition-all duration-300"
              >
                <span className="relative z-10">Découvrir la boutique</span>
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-orange-700 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>

              <a
                href="#produits"
                className="rounded-xl sm:rounded-2xl border-2 border-orange-300 bg-white px-6 sm:px-8 py-3 sm:py-4 text-orange-700 text-center font-bold text-base sm:text-lg hover:bg-orange-50 hover:border-orange-400 hover:scale-105 transition-all duration-300 shadow-sm"
              >
                Voir nos produits
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2 sm:gap-3 pt-2 sm:pt-4">
              {[
                { icon: "✅", text: "Qualité garantie" },
                { icon: "🚚", text: "Livraison rapide" },
                { icon: "📦", text: "Emballage soigné" },
                { icon: "🌿", text: "100% Naturel" }
              ].map((badge) => (
                <div key={badge.text} className="flex items-center gap-1.5 sm:gap-2 rounded-full bg-white border border-gray-200 px-3 sm:px-4 py-1.5 sm:py-2 shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-sm sm:text-base">{badge.icon}</span>
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visuel droite */}
          <div className="relative lg:ml-12 mt-8 lg:mt-0">
            {/* Card principale avec image placeholder */}
            <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-orange-100 via-orange-50 to-white p-4 sm:p-6 lg:p-8 shadow-2xl border border-orange-200/50">
              <div className="aspect-[4/3] rounded-xl sm:rounded-2xl bg-gradient-to-br from-white to-orange-50 shadow-lg border border-orange-100 overflow-hidden flex items-center justify-center relative group">
                <Image
                  src="/hero_section.png"
                  alt="Panier de produits - Café Touba"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Stats cards */}
              <div className="mt-4 sm:mt-6 grid grid-cols-3 gap-2 sm:gap-4">
                {[
                  { label: "Naturel", value: "100%" },
                  { label: "Goût", value: "Authentique" },
                  { label: "Sélection", value: "Premium" }
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl sm:rounded-2xl border border-orange-200 bg-white p-2 sm:p-4 text-center shadow-sm hover:shadow-md hover:scale-105 transition-all">
                    <p className="text-[10px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wide">{stat.label}</p>
                    <p className="mt-0.5 sm:mt-1 font-black text-gray-900 text-xs sm:text-sm md:text-base">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Élément décoratif flottant */}
            <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 opacity-20 blur-2xl animate-pulse" />
            <div className="absolute -bottom-6 -left-6 w-40 h-40 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 opacity-20 blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }} />
          </div>
        </div>
      </section>

      {/* BENEFITS - Design cards moderne */}
      <section className="py-12 sm:py-16 lg:py-20 relative">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900">
            Pourquoi nous choisir ?
          </h2>
          <p className="mt-2 sm:mt-3 text-base sm:text-lg text-gray-600">
            Ce qui fait la différence AL-XADIIMIYA
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-3 relative z-10">
          {[
            { 
              title: "Qualité avant tout", 
              desc: "Des produits choisis avec soin, pour une expérience fiable à chaque commande.", 
              icon: "🏅",
              gradient: "from-orange-500 to-orange-600"
            },
            { 
              title: "Saveurs du pays", 
              desc: "Une boutique pensée pour retrouver des goûts authentiques et naturels.", 
              icon: "🌿",
              gradient: "from-orange-600 to-red-600"
            },
            { 
              title: "Service simple", 
              desc: "Navigation rapide, panier clair, commande facile. Zéro prise de tête.", 
              icon: "⚡",
              gradient: "from-orange-400 to-orange-500"
            },
          ].map((benefit, idx) => (
            <div 
              key={benefit.title} 
              className="group relative rounded-2xl sm:rounded-3xl bg-white p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
              
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-orange-100 to-orange-50 shadow-sm group-hover:scale-110 transition-transform">
                  <span className="text-2xl sm:text-3xl">{benefit.icon}</span>
                </div>
                
                <h3 className="mt-4 sm:mt-5 text-lg sm:text-xl font-black text-gray-900 group-hover:text-orange-700 transition-colors">
                  {benefit.title}
                </h3>
                
                <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
                  {benefit.desc}
                </p>
              </div>

              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-orange-500/10 to-transparent rounded-2xl sm:rounded-3xl" />
            </div>
          ))}
        </div>
      </section>

      {/* PRODUITS SECTION */}
      <section id="produits" className="py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
              <span className="text-2xl sm:text-3xl">🧺</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900">
                Nos produits
              </h2>
            </div>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              Une sélection prête à ajouter au panier.
            </p>
          </div>

          <Link 
            href="/boutique" 
            className="group inline-flex items-center gap-2 text-sm sm:text-base font-bold text-orange-700 hover:text-orange-800 transition-colors"
          >
            Voir toute la boutique
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {preview.map((product, idx) => (
            <div 
              key={product.id}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* CTA final */}
        <div className="mt-10 sm:mt-12 text-center">
          <Link
            href="/boutique"
            className="inline-flex items-center gap-2 rounded-xl sm:rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 px-6 sm:px-8 py-3 sm:py-4 text-white font-bold text-base sm:text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Explorer tous nos produits
            <span>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}