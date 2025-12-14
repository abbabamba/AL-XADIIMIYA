import Link from "next/link";

export default function CancelPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-bold">Paiement annulé</h1>
      <p className="mt-3 text-gray-700">
        Aucun souci. Vous pouvez reprendre votre commande quand vous voulez.
      </p>
      <Link href="/panier" className="mt-6 inline-block rounded-xl border px-4 py-2 hover:bg-gray-50">
        Retour au panier
      </Link>
    </main>
  );
}
