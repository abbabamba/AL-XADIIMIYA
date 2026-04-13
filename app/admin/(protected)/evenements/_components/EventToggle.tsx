"use client";

import { useState } from "react";
import { toggleEventPublished } from "../actions";

export default function EventToggle({ id, published }: { id: string; published: boolean }) {
  const [value, setValue] = useState(published);
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    setLoading(true);
    const next = !value;
    setValue(next);
    await toggleEventPublished(id, next);
    setLoading(false);
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 disabled:opacity-50
        ${value ? "bg-[#D4A843]" : "bg-gray-300"}`}
      aria-label="Toggle publication"
    >
      <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200
        ${value ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  );
}
