"use client";

import { usePathname } from "next/navigation";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return <>{children}</>;
  return <div className="pt-16 sm:pt-20 min-h-screen">{children}</div>;
}
