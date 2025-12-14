import "./globals.css";
import Link from "next/link";
import { CartProvider } from "@/store/cart";
import CartButton from "../components/CartButton";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-gradient-to-br from-orange-50 to-white">
        <CartProvider>
          <header className="bg-white border-b-4 border-orange-400 shadow-sm sticky top-0 z-50">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center justify-between">
              <Link href="/" className="font-bold tracking-tight text-lg sm:text-xl text-gray-900 hover:text-orange-600 transition-colors">
                AL-XADIIMIYA
              </Link>
              <nav className="flex items-center gap-2 sm:gap-4">
                <Link 
                  href="/boutique" 
                  className="rounded-xl px-3 sm:px-4 py-2 text-sm sm:text-base font-medium text-gray-700 hover:bg-orange-100 hover:text-orange-700 transition-all"
                >
                  Boutique
                </Link>
                <CartButton />
              </nav>
            </div>
          </header>

          <div className="min-h-[calc(100vh-180px)]">
            {children}
          </div>

          <footer className="bg-gradient-to-r from-orange-500 to-orange-600 mt-16">
  <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
    <div className="grid gap-8 md:grid-cols-3 text-white">
      <div>
        <p className="font-extrabold text-lg">AL-XADIIMIYA SERVICES</p>
        <p className="mt-2 text-sm text-orange-100">
          Produits 100% africains, naturels et authentiques.
        </p>
      </div>

      <div id="contact" className="md:justify-self-center">
        <p className="font-bold">Contact</p>
        <p className="mt-2 text-sm text-orange-100">
          Email: <a className="font-semibold text-white hover:underline" href="mailto:contact@al-xadiimiya.fr">contact@al-xadiimiya.fr</a>
          <br />
          Téléphone: <a className="font-semibold text-white hover:underline" href="tel:+33751362917">+33 7 51 36 29 17</a>
        </p>

        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <a
            href="mailto:contact@al-xadiimiya.fr"
            className="rounded-2xl bg-white/15 px-4 py-2 text-center text-sm font-semibold hover:bg-white/20 transition-colors"
          >
            Envoyer un email
          </a>
          <a
            href="tel:+33751362917"
            className="rounded-2xl bg-white/15 px-4 py-2 text-center text-sm font-semibold hover:bg-white/20 transition-colors"
          >
            Appeler
          </a>
        </div>
      </div>

      <div className="md:justify-self-end">
        <p className="font-bold">Infos</p>
        <p className="mt-2 text-sm text-orange-100">
          © {new Date().getFullYear()} AL-XADIIMIYA SERVICES
          <br />
          Tous droits réservés
        </p>
      </div>
    </div>
  </div>
</footer>

        </CartProvider>
      </body>
    </html>
  );
}