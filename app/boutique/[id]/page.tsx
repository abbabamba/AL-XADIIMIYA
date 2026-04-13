import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getProductById, getProducts } from "@/data/products";
import AddToCartButton from "@/components/AddToCartButton";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) return {};
  return {
    title: product.title,
    description: product.description ?? undefined,
  };
}

function formatEUR(priceCents: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(
    priceCents / 100
  );
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  const inStock = product.stock > 0;
  const lowStock = inStock && product.stock <= 5;
  const firstLetter = product.title.charAt(0).toUpperCase();

  return (
    <main className="bg-cream min-h-screen">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

        {/* Breadcrumb */}
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm">
          <Link href="/" className="text-gold hover:text-gold-light transition-colors">Accueil</Link>
          <span className="text-dark/30">›</span>
          <Link href="/boutique" className="text-gold hover:text-gold-light transition-colors">Boutique</Link>
          <span className="text-dark/30">›</span>
          <span className="text-dark/60 font-medium line-clamp-1">{product.title}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">

          {/* LEFT — Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl group">
            {product.image_url && product.image_url.trim() !== "" ? (
              <Image
                src={product.image_url}
                alt={product.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div
                className="flex h-full items-center justify-center relative"
                style={{ background: "linear-gradient(135deg, #111111, #1A1A1A)" }}
              >
                <span className="font-playfair text-9xl font-bold text-gold/40 select-none">{firstLetter}</span>
                <span className="absolute bottom-6 right-6 text-4xl opacity-30">📦</span>
              </div>
            )}

            {product.is_popular && (
              <div className="absolute top-4 left-4 bg-gold text-dark text-sm font-bold px-4 py-1.5 rounded-full shadow-lg">
                🔥 POPULAIRE
              </div>
            )}

            {!inStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-dark/50 backdrop-blur-sm">
                <span className="bg-white text-dark font-bold text-lg px-6 py-3 rounded-2xl shadow-xl">
                  Rupture de stock
                </span>
              </div>
            )}
          </div>

          {/* RIGHT — Details */}
          <div className="flex flex-col gap-6">
            {/* Category badge */}
            {product.category && (
              <span className="inline-flex w-fit items-center rounded-full bg-gold text-dark px-4 py-1 text-xs font-bold uppercase tracking-widest">
                {product.category}
              </span>
            )}

            {/* Title */}
            <div>
              <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-dark leading-tight">
                {product.title}
              </h1>
              {product.weight_grams && (
                <p className="mt-1.5 text-sm text-dark/50">Poids : {product.weight_grams}g</p>
              )}
            </div>

            {/* Stars if popular */}
            {product.is_popular && (
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-gold fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
                <span className="text-xs text-dark/50 ml-1">Produit populaire</span>
              </div>
            )}

            {/* Gold divider */}
            <div className="h-px bg-gradient-to-r from-gold/40 to-transparent" />

            {/* Description */}
            <p className="text-dark/70 leading-relaxed text-base sm:text-lg">
              {product.description}
            </p>

            {/* Stock indicator */}
            <div className="flex items-center gap-2">
              {!inStock && (
                <>
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                  <span className="text-sm font-semibold text-red-600">❌ Rupture de stock</span>
                </>
              )}
              {lowStock && (
                <>
                  <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />
                  <span className="text-sm font-semibold text-orange-600">⚠️ Plus que {product.stock} en stock</span>
                </>
              )}
              {inStock && !lowStock && (
                <>
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                  <span className="text-sm font-semibold text-green-700">✅ En stock</span>
                </>
              )}
            </div>

            {/* Price — gold badge for contrast */}
            <div className="inline-flex items-baseline gap-2">
              <div className="bg-gold rounded-2xl px-5 py-3">
                <span className="font-playfair text-4xl font-bold text-dark">
                  {formatEUR(product.price_cents)}
                </span>
              </div>
            </div>

            {/* Add to cart */}
            <AddToCartButton product={product} />

            {/* Back link */}
            <Link
              href="/boutique"
              className="group inline-flex items-center gap-2 text-sm font-medium text-dark/60 hover:text-dark transition-colors w-fit"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              Retour à la boutique
            </Link>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-cream-dark">
              {[
                { icon: "✅", text: "Qualité garantie" },
                { icon: "🚚", text: "Livraison Europe" },
                { icon: "📦", text: "Emballage soigné" },
                { icon: "🌿", text: "100% Naturel" },
              ].map((b) => (
                <div key={b.text} className="flex items-center gap-2 rounded-xl bg-gold/5 border border-gold/15 px-3 py-2 text-xs font-medium text-dark/70">
                  <span>{b.icon}</span>
                  <span>{b.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
