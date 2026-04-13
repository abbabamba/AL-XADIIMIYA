import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/data/products";
import { supabase } from "@/lib/supabase";

async function getUpcomingEvents() {
  try {
    const { data } = await supabase
      .from("events")
      .select("*")
      .eq("is_published", true)
      .gte("event_date", new Date().toISOString())
      .order("event_date", { ascending: true })
      .limit(2);
    return data ?? [];
  } catch {
    return [];
  }
}

function formatEventDate(dateStr: string) {
  const d = new Date(dateStr);
  return {
    day: d.toLocaleDateString("fr-FR", { day: "2-digit" }),
    month: d.toLocaleDateString("fr-FR", { month: "short" }).toUpperCase(),
    full: d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" }),
  };
}

export default async function HomePage() {
  const [allProducts, events] = await Promise.all([getProducts(), getUpcomingEvents()]);
  const preview = allProducts.slice(0, 6);

  return (
    <main>
      {/* ═══════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero_section.jpg"
            alt="Al Xadiimiya — Produits africains naturels"
            fill
            className="object-cover object-center"
            priority
            quality={90}
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-[#111111]/65" />
          {/* Gold gradient overlay at bottom for smooth transition */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#111111] to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto py-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-gold/40 bg-gold/10 text-gold rounded-full px-4 py-1.5 text-sm mb-8 animate-fadeInUp">
            <span>🌿</span>
            <span>100% Naturels • Livraison Europe</span>
          </div>

          {/* H1 */}
          <h1
            className="font-playfair font-bold leading-none mb-4 animate-fadeInUp stagger-1"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)", background: "linear-gradient(135deg, #D4A843, #E8C97A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            Al Xadiimiya
          </h1>

          {/* H2 subtitle */}
          <h2 className="text-cream/70 tracking-[0.4em] sm:tracking-[0.5em] uppercase font-light text-base sm:text-xl mb-4 animate-fadeInUp stagger-2">
            Services
          </h2>

          {/* Tagline */}
          <p className="font-playfair italic text-gold/70 text-lg sm:text-xl mb-10 animate-fadeInUp stagger-3">
            "La qualité, notre priorité"
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp stagger-4">
            <Link
              href="/boutique"
              className="inline-flex items-center justify-center gap-2 bg-gold text-dark font-bold px-8 py-4 rounded-full text-base hover:bg-gold-light hover:scale-105 transition-all duration-300 animate-pulse-gold"
            >
              Découvrir nos produits
              <span>→</span>
            </Link>
            <a
              href="#about"
              className="inline-flex items-center justify-center gap-2 border-2 border-gold text-gold px-8 py-4 rounded-full text-base hover:bg-gold hover:text-dark transition-all duration-300"
            >
              En savoir plus
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gold/40 animate-float">
          <span className="text-xs tracking-widest uppercase">Défiler</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          ABOUT STRIP
      ═══════════════════════════════════════════════ */}
      <section id="about" className="bg-cream py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left — Story */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-gold" />
                <span className="text-xs tracking-[0.3em] text-dark/50 uppercase font-semibold">Notre Histoire</span>
              </div>
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-dark mb-6">
                Des saveurs africaines,<br />
                <span className="relative inline-block">
                  <span className="relative z-10">livrées chez vous</span>
                  <span className="absolute bottom-1 left-0 right-0 h-3 bg-gold/30 -z-0 rounded" />
                </span>
              </h2>
              <p className="text-dark/70 leading-relaxed text-base sm:text-lg mb-4">
                Al Xadiimiya Services est née d&apos;une passion pour les trésors culinaires d&apos;Afrique. Nous sélectionnons avec soin chaque produit — céréales, épices, boissons, superfoods — pour vous offrir une qualité authentique et traçable.
              </p>
              <p className="text-dark/60 leading-relaxed text-sm sm:text-base">
                Implantée en France, nous livrons nos produits 100% naturels partout en Europe, avec un emballage soigné qui préserve leur fraîcheur et leurs bienfaits.
              </p>
            </div>

            {/* Right — Feature pills */}
            <div className="grid grid-cols-1 gap-4">
              {[
                { icon: "🌿", title: "Produits naturels", desc: "Sélection rigoureuse, zéro additif, 100% naturel." },
                { icon: "🚚", title: "Livraison Europe", desc: "Expédition soignée partout en Europe depuis la France." },
                { icon: "⭐", title: "Qualité garantie", desc: "Nous ne vendons que ce que nous mangeons nous-mêmes." },
              ].map((f) => (
                <div key={f.title} className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-sm border border-cream-dark hover:shadow-md hover:border-gold/30 transition-all duration-300">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gold flex items-center justify-center text-2xl">
                    {f.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-dark text-sm">{f.title}</p>
                    <p className="text-dark/60 text-sm mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PRODUCTS PREVIEW
      ═══════════════════════════════════════════════ */}
      <section id="produits" className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.4em] text-dark/50 uppercase font-semibold mb-3">Nos Produits</p>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-dark mb-4">
              Sélection du moment
            </h2>
            <div className="w-16 h-1 bg-gold mx-auto rounded-full" />
          </div>

          {/* Product grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {preview.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Link
              href="/boutique"
              className="inline-flex items-center gap-2 bg-dark text-gold font-bold px-8 py-4 rounded-full text-base hover:bg-gold hover:text-dark transition-all duration-300 border-2 border-gold/30 hover:border-gold"
            >
              Voir tous nos produits
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          EVENTS PREVIEW
      ═══════════════════════════════════════════════ */}
      <section className="bg-dark py-16 sm:py-20 lg:py-24 relative overflow-hidden">
        {/* Decorative blob */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-gold/5 blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.4em] text-gold/60 uppercase font-semibold mb-3">Agenda</p>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-cream">
              Nos Événements
            </h2>
          </div>

          {events.length === 0 ? (
            <div className="text-center py-16 border border-gold/20 rounded-2xl">
              <p className="font-playfair text-2xl text-gold/60 italic">Événements à venir</p>
              <p className="text-cream/40 text-sm mt-3">Restez connectés pour nos prochaines dates !</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {events.map((event: { id: string; title: string; location?: string | null; description?: string | null; event_date: string }) => {
                const date = formatEventDate(event.event_date);
                return (
                  <div key={event.id} className="flex gap-0 rounded-2xl overflow-hidden border border-gold/20 hover:border-gold/40 transition-colors group">
                    {/* Date badge */}
                    <div className="flex-shrink-0 w-20 bg-gold/10 border-r border-gold/20 flex flex-col items-center justify-center py-6">
                      <span className="font-playfair text-3xl font-bold text-gold">{date.day}</span>
                      <span className="text-xs text-gold/60 tracking-wider">{date.month}</span>
                    </div>
                    {/* Content */}
                    <div className="flex-1 p-5">
                      <p className="font-playfair text-lg font-semibold text-cream group-hover:text-gold transition-colors">
                        {event.title}
                      </p>
                      {event.location && (
                        <p className="text-gold/60 text-sm mt-1 flex items-center gap-1">
                          <span>📍</span>{event.location}
                        </p>
                      )}
                      {event.description && (
                        <p className="text-cream/50 text-sm mt-2 line-clamp-2">{event.description}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="mt-10 text-center">
            <Link
              href="/evenements"
              className="inline-flex items-center gap-2 border border-gold/40 text-gold px-6 py-3 rounded-full text-sm hover:bg-gold/10 transition-all"
            >
              Voir tous les événements →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          TRUST BADGES
      ═══════════════════════════════════════════════ */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: "🏆", title: "Qualité exceptionnelle", desc: "Chaque produit rigoureusement sélectionné." },
              { icon: "🌿", title: "100% Naturel", desc: "Aucun additif, aucun artifice." },
              { icon: "🚚", title: "Livraison Europe", desc: "Expédition soignée dans toute l'Europe." },
              { icon: "📦", title: "Emballage soigné", desc: "Vos commandes protégées et préservées." },
            ].map((badge, i) => (
              <div
                key={badge.title}
                className="bg-white rounded-2xl p-6 text-center shadow-sm border border-cream-dark hover:shadow-lg hover:-translate-y-1 hover:border-gold/30 transition-all duration-300 animate-fadeInUp"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="text-4xl mb-4">{badge.icon}</div>
                <p className="font-semibold text-dark text-sm mb-1">{badge.title}</p>
                <p className="text-dark/50 text-xs leading-relaxed">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
