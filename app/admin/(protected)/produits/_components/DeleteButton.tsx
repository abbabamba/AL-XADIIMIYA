'use client'
import { useState, useTransition } from 'react'
import { deleteProduct } from '../actions'
import ConfirmModal from '../../_components/ConfirmModal'

export default function DeleteButton({
  id,
  title,
}: {
  id: string
  title: string
}) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  function handleConfirm() {
    startTransition(() => {
      deleteProduct(id)
    })
    setOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        disabled={isPending}
        className="text-xs bg-red-50 hover:bg-red-100 text-red-600 font-medium px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
      >
        {isPending ? '…' : 'Supprimer'}
      </button>

      <ConfirmModal
        open={open}
        title="Supprimer le produit"
        message={`« ${title} » sera définitivement supprimé. Cette action est irréversible.`}
        confirmLabel="Supprimer"
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
        loading={isPending}
      />
    </>
  )
}
