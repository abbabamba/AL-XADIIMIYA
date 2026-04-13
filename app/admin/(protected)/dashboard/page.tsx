import { supabaseAdmin } from '@/lib/supabase-admin'
import Link from 'next/link'
import { STATUS_LABELS } from '../_lib/order-status'

export default async function DashboardPage() {
  const now = new Date()
  const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()

  const [
    { count: totalOrdersMonth },
    { data: revenueRows },
    { count: pendingOrders },
    { count: activeProducts },
    { data: recentOrders },
    { data: lowStockProducts },
  ] = await Promise.all([
    supabaseAdmin
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', firstOfMonth),
    supabaseAdmin
      .from('orders')
      .select('total_cents')
      .gte('created_at', firstOfMonth),
    supabaseAdmin
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'paid'),
    supabaseAdmin
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true),
    supabaseAdmin
      .from('orders')
      .select('id, created_at, customer_name, customer_email, total_cents, status')
      .order('created_at', { ascending: false })
      .limit(10),
    supabaseAdmin
      .from('products')
      .select('id, title, stock, category')
      .lte('stock', 5)
      .eq('is_active', true)
      .order('stock', { ascending: true }),
  ])

  const revenueMonth =
    (revenueRows ?? []).reduce((sum, o) => sum + (o.total_cents ?? 0), 0) / 100

  const stats = [
    {
      label: 'Commandes ce mois',
      value: totalOrdersMonth ?? 0,
      icon: '🛍️',
    },
    {
      label: 'Chiffre d\'affaires',
      value: `${revenueMonth.toFixed(2)} €`,
      icon: '💰',
    },
    {
      label: 'En attente',
      value: pendingOrders ?? 0,
      icon: '⏳',
    },
    {
      label: 'Produits actifs',
      value: activeProducts ?? 0,
      icon: '📦',
    },
  ]

  return (
    <div className="p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-[#111111] mb-8">
        Tableau de bord
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-xl shadow-sm border-l-4 border-[#D4A843] p-5"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{s.icon}</span>
            </div>
            <p className="text-3xl font-bold text-[#111111]">{s.value}</p>
            <p className="text-sm text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent orders */}
        <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-[#111111]">Dernières commandes</h2>
            <Link
              href="/admin/commandes"
              className="text-sm text-[#D4A843] hover:underline"
            >
              Voir tout →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-xs uppercase">
                  <th className="px-6 py-3 text-left font-medium">Date</th>
                  <th className="px-6 py-3 text-left font-medium">Client</th>
                  <th className="px-6 py-3 text-left font-medium">Total</th>
                  <th className="px-6 py-3 text-left font-medium">Statut</th>
                  <th className="px-6 py-3 text-left font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {(recentOrders ?? []).map((order) => {
                  const status =
                    STATUS_LABELS[order.status] ?? STATUS_LABELS.paid
                  return (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-3 text-gray-500 whitespace-nowrap">
                        {new Date(order.created_at).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-3 font-medium text-gray-800 whitespace-nowrap">
                        {order.customer_name ?? order.customer_email ?? '—'}
                      </td>
                      <td className="px-6 py-3 text-gray-700 whitespace-nowrap">
                        {((order.total_cents ?? 0) / 100).toFixed(2)} €
                      </td>
                      <td className="px-6 py-3">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${status.className}`}
                        >
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <Link
                          href={`/admin/commandes/${order.id}`}
                          className="text-[#D4A843] hover:underline text-xs"
                        >
                          Voir
                        </Link>
                      </td>
                    </tr>
                  )
                })}
                {(recentOrders ?? []).length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-8 text-center text-gray-400"
                    >
                      Aucune commande
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low stock */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-[#111111]">⚠️ Stock faible</h2>
            <p className="text-xs text-gray-400 mt-0.5">Produits actifs ≤ 5 unités</p>
          </div>
          <div className="divide-y divide-gray-50">
            {(lowStockProducts ?? []).map((p) => (
              <div
                key={p.id}
                className="px-6 py-3 flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-gray-800">{p.title}</p>
                  <p className="text-xs text-gray-400">{p.category}</p>
                </div>
                <span
                  className={`text-sm font-bold px-2 py-0.5 rounded-lg ${
                    p.stock === 0
                      ? 'bg-red-100 text-red-600'
                      : 'bg-orange-100 text-orange-600'
                  }`}
                >
                  {p.stock}
                </span>
              </div>
            ))}
            {(lowStockProducts ?? []).length === 0 && (
              <p className="px-6 py-8 text-center text-gray-400 text-sm">
                Tous les stocks sont OK ✓
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
