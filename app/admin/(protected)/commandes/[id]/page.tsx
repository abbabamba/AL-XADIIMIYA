import { supabaseAdmin } from '@/lib/supabase-admin'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { revalidatePath } from 'next/cache'
import { STATUS_LABELS, STATUS_OPTIONS } from '../../_lib/order-status'

async function updateStatus(orderId: string, formData: FormData) {
  'use server'
  const newStatus = formData.get('status') as string
  await supabaseAdmin.from('orders').update({ status: newStatus }).eq('id', orderId)
  revalidatePath(`/admin/commandes/${orderId}`)
  revalidatePath('/admin/commandes')
}

export default async function CommandeDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ updated?: string }>
}) {
  const { id } = await params
  const sp = await searchParams
  const updated = sp.updated === '1'

  const [{ data: order }, { data: items }] = await Promise.all([
    supabaseAdmin
      .from('orders')
      .select('*')
      .eq('id', id)
      .single(),
    supabaseAdmin
      .from('order_items')
      .select('*')
      .eq('order_id', id),
  ])

  if (!order) notFound()

  const address = order.shipping_address as {
    line1?: string
    line2?: string
    city?: string
    postal_code?: string
    country?: string
  } | null

  const status = STATUS_LABELS[order.status] ?? STATUS_LABELS.paid
  const updateWithId = updateStatus.bind(null, id)

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/commandes"
          className="text-gray-500 hover:text-[#111111] text-sm"
        >
          ← Retour
        </Link>
        <h1 className="text-2xl font-bold text-[#111111]">
          Commande
        </h1>
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${status.className}`}>
          {status.label}
        </span>
      </div>

      {updated && (
        <div className="mb-5 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
          ✓ Statut mis à jour avec succès
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        {/* Customer */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <h2 className="font-semibold text-[#111111] mb-4 border-b border-gray-100 pb-3">
            👤 Client
          </h2>
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-gray-500">Nom :</span>{' '}
              <span className="font-medium">{order.customer_name ?? '—'}</span>
            </p>
            <p>
              <span className="text-gray-500">Email :</span>{' '}
              <span className="font-medium">{order.customer_email ?? '—'}</span>
            </p>
            <p>
              <span className="text-gray-500">Téléphone :</span>{' '}
              <span className="font-medium">{order.customer_phone ?? '—'}</span>
            </p>
          </div>
        </div>

        {/* Shipping address */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <h2 className="font-semibold text-[#111111] mb-4 border-b border-gray-100 pb-3">
            📍 Adresse de livraison
          </h2>
          {address ? (
            <div className="text-sm space-y-1 text-gray-700">
              <p>{address.line1}</p>
              {address.line2 && <p>{address.line2}</p>}
              <p>
                {address.postal_code} {address.city}
              </p>
              <p>{address.country}</p>
            </div>
          ) : (
            <p className="text-sm text-gray-400">Non renseignée</p>
          )}
        </div>
      </div>

      {/* Items */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-5">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-[#111111]">📦 Articles</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-xs uppercase">
              <th className="px-5 py-3 text-left font-medium">Produit</th>
              <th className="px-5 py-3 text-left font-medium">Qté</th>
              <th className="px-5 py-3 text-right font-medium">Prix unit.</th>
              <th className="px-5 py-3 text-right font-medium">Sous-total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {(items ?? []).map((item) => (
              <tr key={item.id}>
                <td className="px-5 py-3 font-medium text-gray-800">
                  {item.title}
                </td>
                <td className="px-5 py-3 text-gray-600">{item.quantity}</td>
                <td className="px-5 py-3 text-right text-gray-600">
                  {((item.price_cents ?? 0) / 100).toFixed(2)} €
                </td>
                <td className="px-5 py-3 text-right font-medium text-gray-800">
                  {(((item.price_cents ?? 0) * (item.quantity ?? 1)) / 100).toFixed(2)} €
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-[#D4A843]">
              <td colSpan={3} className="px-5 py-4 font-bold text-[#111111]">
                Total
              </td>
              <td className="px-5 py-4 text-right font-bold text-[#D4A843] text-lg">
                {((order.total_cents ?? 0) / 100).toFixed(2)} €
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Status update */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <h2 className="font-semibold text-[#111111] mb-4">
          🔄 Mettre à jour le statut
        </h2>
        <form action={updateWithId} className="flex gap-3 items-center">
          <select
            name="status"
            defaultValue={order.status}
            className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A843] bg-white"
          >
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-[#D4A843] hover:bg-[#B8902F] text-[#111111] font-bold px-5 py-2.5 rounded-lg text-sm transition-colors"
          >
            Mettre à jour
          </button>
        </form>
        <p className="text-xs text-gray-400 mt-4">
          Session Stripe : {order.stripe_session_id}
          <br />
          Date : {new Date(order.created_at).toLocaleString('fr-FR')}
        </p>
      </div>
    </div>
  )
}
