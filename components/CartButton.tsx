"use client";

import Link from "next/link";
import { useCart } from "@/store/cart";

export default function CartButton() {
  const cart = useCart();

  return (
    <Link
      href="/panier"
      className="relative flex items-center gap-2 rounded-full border border-gold/40 px-3 sm:px-4 py-2 text-gold hover:bg-gold hover:text-dark hover:border-gold transition-all duration-300 hover:scale-110 group"
      aria-label="Panier"
    >
      {/* Shopping bag SVG */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0"
      >
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>

      <span className="hidden sm:inline text-sm font-medium">Panier</span>

      {cart.count > 0 && (
        <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-dark text-[10px] font-bold group-hover:bg-dark group-hover:text-gold transition-colors">
          {cart.count}
        </span>
      )}
    </Link>
  );
}
