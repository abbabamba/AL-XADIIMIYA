'use client'
import { useState, useTransition } from 'react'
import { deleteEvent } from '../actions'
import ConfirmModal from '../../_components/ConfirmModal'

export default function DeleteEventButton({ id }: { id: string }) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  function handleConfirm() {
    startTransition(() => {
      deleteEvent(id)
    })
    setOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        disabled={isPending}
        className="text-xs px-3 py-1.5 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
      >
        {isPending ? '…' : 'Supprimer'}
      </button>

      <ConfirmModal
        open={open}
        title="Supprimer l'événement"
        message="Cet événement sera définitivement supprimé. Cette action est irréversible."
        confirmLabel="Supprimer"
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
        loading={isPending}
      />
    </>
  )
}
