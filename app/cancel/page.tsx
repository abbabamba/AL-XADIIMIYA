import Link from "next/link";

export default function CancelPage() {
  return (
    <main className="min-h-screen bg-cream flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center text-2xl font-bold text-dark mx-auto mb-6">
          ✗
        </div>
        <h1 className="font-playfair text-3xl font-bold text-dark mb-3">Paiement annulé</h1>
        <p className="text-dark/60 text-base mb-8">
          Aucun souci — votre panier est conservé. Vous pouvez reprendre votre commande quand vous voulez.
        </p>
        <Link
          href="/panier"
          className="inline-flex items-center gap-2 bg-gold text-dark font-bold px-8 py-4 rounded-full hover:bg-gold-light hover:scale-105 transition-all duration-300"
        >
          ← Retour au panier
        </Link>
      </div>
    </main>
  );
}
