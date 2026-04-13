'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import AdminSidebar from './AdminSidebar'

const PAGE_TITLES: Record<string, string> = {
  '/admin/dashboard':   'Tableau de bord',
  '/admin/commandes':   'Commandes',
  '/admin/evenements':  'Événements',
  '/admin/produits':    'Produits',
}

function getPageInfo(pathname: string): { title: string; parent?: { label: string; href: string } } {
  if (pathname.startsWith('/admin/commandes/') && pathname !== '/admin/commandes') {
    return { title: 'Détail commande', parent: { label: 'Commandes', href: '/admin/commandes' } }
  }
  if (pathname === '/admin/produits/new') {
    return { title: 'Nouveau produit', parent: { label: 'Produits', href: '/admin/produits' } }
  }
  if (pathname.startsWith('/admin/produits/') && pathname !== '/admin/produits') {
    return { title: 'Modifier produit', parent: { label: 'Produits', href: '/admin/produits' } }
  }
  if (pathname === '/admin/evenements/new') {
    return { title: 'Nouvel événement', parent: { label: 'Événements', href: '/admin/evenements' } }
  }
  const title = PAGE_TITLES[pathname] ?? 'Admin'
  return { title }
}

export default function AdminTopbar({ userEmail }: { userEmail: string }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { title, parent } = getPageInfo(pathname)
  const initials = userEmail.slice(0, 2).toUpperCase()

  return (
    <>
      {/* Mobile sidebar overlay */}
      <div className="lg:hidden">
        <AdminSidebar
          userEmail={userEmail}
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />
      </div>

      {/* Top bar */}
      <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 flex-shrink-0 z-10">
        {/* Left: hamburger + breadcrumb */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors flex-shrink-0"
            aria-label="Ouvrir le menu"
          >
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden>
              <path d="M1 1h16M1 7h16M1 13h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>

          <nav className="flex items-center gap-1.5 text-sm min-w-0">
            {parent ? (
              <>
                <a
                  href={parent.href}
                  className="text-gray-400 hover:text-[#D4A843] transition-colors truncate hidden sm:block"
                >
                  {parent.label}
                </a>
                <span className="text-gray-300 hidden sm:block">/</span>
                <span className="font-semibold text-[#111111] truncate">{title}</span>
              </>
            ) : (
              <span className="font-semibold text-[#111111] truncate">{title}</span>
            )}
          </nav>
        </div>

        {/* Right: user */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <span className="hidden sm:block text-xs text-gray-400 max-w-[180px] truncate">
            {userEmail}
          </span>
          <div className="w-8 h-8 rounded-full bg-[#D4A843] flex items-center justify-center text-[#111111] font-bold text-xs flex-shrink-0">
            {initials}
          </div>
        </div>
      </header>
    </>
  )
}
