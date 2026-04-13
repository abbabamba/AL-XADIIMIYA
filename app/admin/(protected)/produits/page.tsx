import { supabaseAdmin } from '@/lib/supabase-admin'
import Link from 'next/link'
import ProductToggle from './_components/ProductToggle'
import DeleteButton from './_components/DeleteButton'

export default async function ProduitsPage() {
  const { data: products } = await supabaseAdmin
    .from('products')
    .select('id, title, category, price_cents, stock, is_active, is_popular, image_url')
    .order('created_at', { ascending: false })

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#111111]">Produits</h1>
        <Link
          href="/admin/produits/new"
          className="bg-[#D4A843] hover:bg-[#B8902F] text-[#111111] font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
        >
          + Ajouter un produit
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-xs uppercase">
                <th className="px-5 py-3 text-left font-medium">Produit</th>
                <th className="px-5 py-3 text-left font-medium">Catégorie</th>
                <th className="px-5 py-3 text-left font-medium">Prix</th>
                <th className="px-5 py-3 text-left font-medium">Stock</th>
                <th className="px-5 py-3 text-center font-medium">Actif</th>
                <th className="px-5 py-3 text-center font-medium">Populaire</th>
                <th className="px-5 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {(products ?? []).map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      {p.image_url ? (
                        <img
                          src={p.image_url}
                          alt={p.title}
                          className="w-10 h-10 object-cover rounded-lg border border-gray-100"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                          📦
                        </div>
                      )}
                      <span className="font-medium text-gray-800">{p.title}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-600 capitalize">{p.category}</td>
                  <td className="px-5 py-3 text-gray-700 font-medium">
                    {((p.price_cents ?? 0) / 100).toFixed(2)} €
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`font-medium ${
                        p.stock === 0
                          ? 'text-red-600'
                          : p.stock <= 5
                          ? 'text-orange-500'
                          : 'text-gray-700'
                      }`}
                    >
                      {p.stock}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <ProductToggle
                      id={p.id}
                      field="active"
                      value={p.is_active}
                    />
                  </td>
                  <td className="px-5 py-3 text-center">
                    <ProductToggle
                      id={p.id}
                      field="popular"
                      value={p.is_popular}
                    />
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/produits/${p.id}`}
                        className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Modifier
                      </Link>
                      <DeleteButton id={p.id} title={p.title} />
                    </div>
                  </td>
                </tr>
              ))}
              {(products ?? []).length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-gray-400">
                    Aucun produit
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
