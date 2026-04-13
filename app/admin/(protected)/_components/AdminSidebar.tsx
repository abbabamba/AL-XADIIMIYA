'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { signOut } from '@/app/admin/actions'
import { useState } from 'react'

const navLinks = [
  {
    href: '/admin/dashboard',
    label: 'Tableau de bord',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
      </svg>
    ),
  },
  {
    href: '/admin/commandes',
    label: 'Commandes',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path d="M2 2h1.5l2 7h7l1.5-5H5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="6.5" cy="13" r="1" fill="currentColor"/>
        <circle cx="11.5" cy="13" r="1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    href: '/admin/evenements',
    label: 'Événements',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <rect x="1.5" y="3" width="13" height="11" rx="2" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M5 1.5v3M11 1.5v3M1.5 7h13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    href: '/admin/produits',
    label: 'Produits',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path d="M2 5l6-3 6 3v6l-6 3-6-3V5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
        <path d="M8 2v12M2 5l6 3 6-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
]

export default function AdminSidebar({
  userEmail,
  open,
  onClose = () => {},
}: {
  userEmail: string
  open: boolean
  onClose?: () => void
}) {
  const pathname = usePathname()
  const [signingOut, setSigningOut] = useState(false)

  async function handleSignOut() {
    setSigningOut(true)
    await signOut()
  }

  return (
    <>
      {/* Mobile overlay backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-60 bg-[#111111] flex flex-col z-30
          transform transition-transform duration-200
          ${open ? 'translate-x-0' : '-translate-x-full'}
          lg:static lg:translate-x-0 lg:flex
        `}
      >
        {/* Logo */}
        <div className="px-5 py-5 border-b border-[#D4A843]/15 flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Al Xadiimiya"
            width={110}
            height={44}
            className="h-9 w-auto object-contain"
          />
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#D4A843]/50 uppercase leading-none">
            Admin
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-5 space-y-0.5">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-[#D4A843]/30 uppercase px-3 mb-3">
            Navigation
          </p>
          {navLinks.map(({ href, label, icon }) => {
            const isActive = pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
                  ${isActive
                    ? 'bg-[#D4A843] text-[#111111]'
                    : 'text-[#D4A843]/60 hover:bg-[#D4A843]/8 hover:text-[#D4A843]'
                  }
                `}
              >
                <span className={isActive ? 'text-[#111111]' : 'text-[#D4A843]/50'}>
                  {icon}
                </span>
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Bottom: boutique link + logout */}
        <div className="px-3 pb-5 space-y-1 border-t border-[#D4A843]/15 pt-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#D4A843]/50 hover:bg-[#D4A843]/8 hover:text-[#D4A843] transition-all duration-150"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M7 2H3a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              <path d="M10 2h4v4M14 2l-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Voir la boutique
          </a>

          <button
            onClick={handleSignOut}
            disabled={signingOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#D4A843]/50 hover:bg-red-900/30 hover:text-red-400 transition-all duration-150 disabled:opacity-40"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M6 14H3a1 1 0 01-1-1V3a1 1 0 011-1h3M11 11l3-3-3-3M14 8H6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {signingOut ? 'Déconnexion…' : 'Se déconnecter'}
          </button>

          <p className="text-[11px] text-[#D4A843]/25 truncate px-3 pt-1">
            {userEmail}
          </p>
        </div>
      </aside>
    </>
  )
}
