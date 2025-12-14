"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type CartItem = {
  id: string;
  title: string;
  priceCents: number;
  qty: number;
  image?: string;
};

type CartContextValue = {
  items: CartItem[];
  add: (item: Omit<CartItem, "qty">) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  totalCents: number;
  count: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const LS_KEY = "alx_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      setItems(raw ? JSON.parse(raw) : []);
    } catch {
      setItems([]);
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const add = (item: Omit<CartItem, "qty">) => {
      setItems((prev) => {
        const found = prev.find((i) => i.id === item.id);
        if (found) {
          return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
        }
        return [...prev, { ...item, qty: 1 }];
      });
    };

    const inc = (id: string) =>
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)));

    const dec = (id: string) =>
      setItems((prev) =>
        prev
          .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
          .filter((i) => i.qty > 0)
      );

    const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));
    const clear = () => setItems([]);

    const totalCents = items.reduce((s, i) => s + i.priceCents * i.qty, 0);
    const count = items.reduce((s, i) => s + i.qty, 0);

    return { items, add, inc, dec, remove, clear, totalCents, count };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
