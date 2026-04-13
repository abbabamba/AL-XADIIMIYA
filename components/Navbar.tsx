"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import CartButton from "./CartButton";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/boutique", label: "Boutique" },
  { href: "/evenements", label: "Événements" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (pathname.startsWith("/admin")) return null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${scrolled
            ? "bg-dark/95 backdrop-blur-md shadow-lg shadow-black/40"
            : "bg-dark"
          }
          border-b border-gold/20`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-between">

            {/* Logo */}
            <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center group">
              <Image
                src="/logo.png"
                alt="Al Xadiimiya Services"
                width={140}
                height={56}
                className="h-10 sm:h-12 w-auto object-contain group-hover:opacity-90 transition-opacity"
                priority
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm font-medium text-gold/80 hover:text-gold transition-colors tracking-wide relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-gold after:transition-all hover:after:w-full"
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Right: Cart + Hamburger */}
            <div className="flex items-center gap-3">
              <CartButton />

              {/* Hamburger — mobile only */}
              <button
                className="md:hidden flex flex-col items-center justify-center w-10 h-10 gap-1.5 rounded-xl border border-gold/30 hover:border-gold/60 transition-colors"
                onClick={() => setMobileOpen((o) => !o)}
                aria-label="Menu"
              >
                <span className={`block h-0.5 w-5 bg-gold transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`block h-0.5 w-5 bg-gold transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 w-5 bg-gold transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <div
        className={`fixed inset-0 z-40 bg-dark flex flex-col items-center justify-center transition-all duration-500 md:hidden
          ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        {/* Decorative gold blobs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-gold/5 blur-3xl pointer-events-none" />

        <nav className="flex flex-col items-center gap-8 relative z-10">
          {NAV_LINKS.map(({ href, label }, i) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`font-playfair text-4xl font-bold text-gold/80 hover:text-gold transition-colors animate-fadeInUp`}
              style={{ animationDelay: `${i * 0.1}s`, opacity: mobileOpen ? 1 : 0 }}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="mt-12 flex flex-col items-center gap-3 animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
          <Image
            src="/logo.png"
            alt="Al Xadiimiya Services"
            width={120}
            height={48}
            className="h-10 w-auto object-contain opacity-40"
          />
          <span className="text-gold/30 text-xs tracking-widest uppercase">La qualité, notre priorité</span>
        </div>
      </div>
    </>
  );
}
