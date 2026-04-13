import { supabaseAdmin } from '@/lib/supabase-admin'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ProductForm from '../_components/ProductForm'

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const { data: product } = await supabaseAdmin
    .from('products')
    .select('id, title, description, price_cents, category, stock, weight_grams, image_url, is_popular, is_active')
    .eq('id', id)
    .single()

  if (!product) notFound()

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/produits" className="text-gray-500 hover:text-[#111111] text-sm">
          ← Retour
        </Link>
        <h1 className="text-2xl font-bold text-[#111111]">Modifier le produit</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <ProductForm product={product} />
      </div>
    </div>
  )
}
