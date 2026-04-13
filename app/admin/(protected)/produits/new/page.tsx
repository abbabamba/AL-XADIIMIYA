import Link from 'next/link'
import ProductForm from '../_components/ProductForm'

export default function NewProductPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/produits" className="text-gray-500 hover:text-[#111111] text-sm">
          ← Retour
        </Link>
        <h1 className="text-2xl font-bold text-[#111111]">Nouveau produit</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <ProductForm />
      </div>
    </div>
  )
}
