import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import { CartProvider } from "@/store/cart";
import Navbar from "@/components/Navbar";
import LayoutShell from "@/components/LayoutShell";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: '%s | Al Xadiimiya Services',
    default: 'Al Xadiimiya Services — Produits africains 100% naturels',
  },
  description: 'Boutique en ligne de produits alimentaires africains 100% naturels. Café Touba, thiéré, baobab, bissap. Livraison partout en Europe.',
  keywords: ['café touba', 'produits africains', 'naturels', 'sénégalais', 'thiéré', 'baobab', 'bissap', 'livraison france'],
  authors: [{ name: 'Al Xadiimiya Services' }],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Al Xadiimiya',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Al Xadiimiya Services',
    title: 'Al Xadiimiya Services — Produits africains 100% naturels',
    description: 'Café Touba, thiéré, baobab, bissap. Livraison partout en Europe.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${playfair.variable} ${poppins.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#D4A843" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Al Xadiimiya" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body suppressHydrationWarning>
        <CartProvider>
          {/* Sticky Navbar — hidden on /admin routes */}
          <Navbar />

          {/* Main content — padding only on non-admin routes */}
          <LayoutShell>
            {children}
          </LayoutShell>

          {/* Footer */}
          <footer className="bg-dark border-t border-gold/20">
            {/* Gold separator */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">

                {/* Col 1 — Brand */}
                <div>
                  <Image
                    src="/logo.png"
                    alt="Al Xadiimiya Services"
                    width={140}
                    height={56}
                    className="h-12 w-auto object-contain mb-4"
                  />
                  <p className="text-sm text-gold/60 leading-relaxed italic">
                    "La qualité, notre priorité"
                  </p>
                  <p className="mt-3 text-sm text-gold/50">
                    Produits africains 100% naturels et authentiques.
                  </p>
                </div>

                {/* Col 2 — Navigation */}
                <div>
                  <p className="text-xs tracking-[0.3em] text-gold/50 uppercase font-semibold mb-4">Navigation</p>
                  <nav className="flex flex-col gap-3">
                    {[
                      { href: "/", label: "Accueil" },
                      { href: "/boutique", label: "Boutique" },
                      { href: "/evenements", label: "Événements" },
                    ].map(({ href, label }) => (
                      <Link
                        key={href}
                        href={href}
                        className="text-sm text-gold/70 hover:text-gold transition-colors w-fit"
                      >
                        {label}
                      </Link>
                    ))}
                  </nav>
                </div>

                {/* Col 3 — Contact */}
                <div>
                  <p className="text-xs tracking-[0.3em] text-gold/50 uppercase font-semibold mb-4">Contact</p>
                  <ul className="space-y-3 text-sm text-gold/70">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5">📧</span>
                      <a href="mailto:contact@al-xadiimiya.fr" className="hover:text-gold transition-colors break-all">
                        contact@al-xadiimiya.fr
                      </a>
                    </li>
                    <li className="flex items-center gap-2">
                      <span>📱</span>
                      <a href="tel:+33751362917" className="hover:text-gold transition-colors">
                        +33 7 51 36 29 17
                      </a>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5">📍</span>
                      <span>France — Livraison partout en Europe</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gold/10 py-5">
              <p className="text-center text-xs text-gold/40">
                © {new Date().getFullYear()} Al Xadiimiya Services — Tous droits réservés
              </p>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
