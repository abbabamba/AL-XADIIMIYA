import { supabaseAdmin } from '@/lib/supabase-admin'
import Link from 'next/link'
import { Suspense } from 'react'
import CommandesFilter from './_components/CommandesFilter'
import { STATUS_LABELS } from '../_lib/order-status'

export default async function CommandesPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; status?: string }>
}) {
  const params = await searchParams
  const search = params.search ?? ''
  const status = params.status ?? ''

  let query = supabaseAdmin
    .from('orders')
    .select('id, created_at, customer_name, customer_email, customer_phone, total_cents, status')
    .order('created_at', { ascending: false })

  if (status && status !== 'tous') {
    query = query.eq('status', status)
  }

  if (search) {
    query = query.or(
      `customer_name.ilike.%${search}%,customer_email.ilike.%${search}%`
    )
  }

  const { data: orders } = await query

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#111111]">Commandes</h1>
        <span className="text-sm text-gray-500">
          {orders?.length ?? 0} résultat(s)
        </span>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <Suspense fallback={null}>
          <CommandesFilter />
        </Suspense>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-xs uppercase">
                <th className="px-5 py-3 text-left font-medium">Date</th>
                <th className="px-5 py-3 text-left font-medium">Client</th>
                <th className="px-5 py-3 text-left font-medium">Email</th>
                <th className="px-5 py-3 text-left font-medium">Téléphone</th>
                <th className="px-5 py-3 text-left font-medium">Total</th>
                <th className="px-5 py-3 text-left font-medium">Statut</th>
                <th className="px-5 py-3 text-left font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {(orders ?? []).map((order) => {
                const s = STATUS_LABELS[order.status] ?? STATUS_LABELS.paid
                return (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-5 py-3 text-gray-500 whitespace-nowrap">
                      {new Date(order.created_at).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-5 py-3 font-medium text-gray-800 whitespace-nowrap">
                      {order.customer_name ?? '—'}
                    </td>
                    <td className="px-5 py-3 text-gray-600 whitespace-nowrap">
                      {order.customer_email ?? '—'}
                    </td>
                    <td className="px-5 py-3 text-gray-600 whitespace-nowrap">
                      {order.customer_phone ?? '—'}
                    </td>
                    <td className="px-5 py-3 font-medium text-gray-800 whitespace-nowrap">
                      {((order.total_cents ?? 0) / 100).toFixed(2)} €
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${s.className}`}
                      >
                        {s.label}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <Link
                        href={`/admin/commandes/${order.id}`}
                        className="text-[#D4A843] hover:underline text-xs font-medium"
                      >
                        Voir détail →
                      </Link>
                    </td>
                  </tr>
                )
              })}
              {(orders ?? []).length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-12 text-center text-gray-400"
                  >
                    Aucune commande trouvée
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
