import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-bold">Paiement confirmé ✅</h1>
      <p className="mt-3 text-gray-700">
        Merci pour votre commande. Nous vous contacterons si nécessaire pour la livraison.
      </p>
      <Link href="/boutique" className="mt-6 inline-block rounded-xl border px-4 py-2 hover:bg-gray-50">
        Retour à la boutique
      </Link>
    </main>
  );
}
