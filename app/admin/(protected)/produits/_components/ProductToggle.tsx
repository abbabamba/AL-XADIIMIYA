'use client'
import { useTransition } from 'react'
import { toggleProductActive, toggleProductPopular } from '../actions'

export default function ProductToggle({
  id,
  field,
  value,
}: {
  id: string
  field: 'active' | 'popular'
  value: boolean
}) {
  const [isPending, startTransition] = useTransition()

  function handleToggle() {
    startTransition(() => {
      if (field === 'active') {
        toggleProductActive(id, !value)
      } else {
        toggleProductPopular(id, !value)
      }
    })
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={`
        relative inline-flex h-5 w-9 items-center rounded-full transition-colors
        ${isPending ? 'opacity-50' : ''}
        ${value ? 'bg-[#D4A843]' : 'bg-gray-300'}
      `}
      aria-label="Basculer"
    >
      <span
        className={`
          inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform
          ${value ? 'translate-x-4.5' : 'translate-x-0.5'}
        `}
      />
    </button>
  )
}
