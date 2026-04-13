export const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  paid:       { label: 'Payé',      className: 'bg-green-100 text-green-700'  },
  processing: { label: 'En cours',  className: 'bg-blue-100 text-blue-700'   },
  shipped:    { label: 'Expédié',   className: 'bg-orange-100 text-orange-700' },
  delivered:  { label: 'Livré',     className: 'bg-gray-100 text-gray-700'   },
  cancelled:  { label: 'Annulé',    className: 'bg-red-100 text-red-700'     },
}

export const STATUS_OPTIONS = [
  { value: 'paid',       label: 'Payé' },
  { value: 'processing', label: 'En cours' },
  { value: 'shipped',    label: 'Expédié' },
  { value: 'delivered',  label: 'Livré' },
  { value: 'cancelled',  label: 'Annulé' },
]
