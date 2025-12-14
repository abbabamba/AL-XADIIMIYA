"use client";

import Link from "next/link";
import { useCart } from "@/store/cart";

export default function CartButton() {
  const cart = useCart();

  return (
    <Link
      href="/panier"
      className="relative rounded-xl border px-4 py-2 hover:bg-gray-50"
    >
      Panier
      {cart.count > 0 ? (
        <span className="ml-2 inline-flex items-center justify-center rounded-full bg-black px-2 py-0.5 text-xs text-white">
          {cart.count}
        </span>
      ) : null}
    </Link>
  );
}
