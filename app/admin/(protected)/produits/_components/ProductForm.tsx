'use client'
import { useState, useRef } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'
import { upsertProduct } from '../actions'

const CATEGORIES = [
  'cereales',
  'boissons',
  'superfoods',
  'confitures',
  'condiments',
  'sirops',
  'desserts',
  'general',
]

type Product = {
  id: string
  title: string
  description: string
  price_cents: number
  category: string
  stock: number
  weight_grams: number | null
  image_url: string | null
  is_popular: boolean
  is_active: boolean
}

export default function ProductForm({ product }: { product?: Product }) {
  const [imageUrl, setImageUrl] = useState(product?.image_url ?? '')
  const [preview, setPreview] = useState(product?.image_url ?? '')
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadError('')

    // Preview
    const localUrl = URL.createObjectURL(file)
    setPreview(localUrl)

    // Upload to Supabase Storage
    setUploading(true)
    const supabase = createSupabaseBrowserClient()
    const ext = file.name.split('.').pop()
    const fileName = `${crypto.randomUUID()}.${ext}`

    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(fileName, file, { upsert: true })

    if (error || !data) {
      setUploadError("Erreur lors de l'upload de l'image.")
      setUploading(false)
      return
    }

    const { data: urlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(data.path)

    setImageUrl(urlData.publicUrl)
    setUploading(false)
  }

  return (
    <form action={upsertProduct} className="space-y-6 max-w-2xl">
      {product?.id && (
        <input type="hidden" name="id" value={product.id} />
      )}
      <input type="hidden" name="image_url" value={imageUrl} />

      {/* Image upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Image du produit
        </label>
        <div className="flex gap-4 items-start">
          {preview ? (
            <img
              src={preview}
              alt="Aperçu"
              className="w-24 h-24 object-cover rounded-xl border border-gray-200"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-100 rounded-xl border border-gray-200 flex items-center justify-center text-2xl">
              📦
            </div>
          )}
          <div className="flex-1">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              {uploading ? 'Upload en cours...' : 'Choisir une image'}
            </button>
            {uploadError && (
              <p className="text-red-500 text-xs mt-1">{uploadError}</p>
            )}
            {imageUrl && !uploading && (
              <p className="text-green-600 text-xs mt-1">✓ Image uploadée</p>
            )}
          </div>
        </div>
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Titre <span className="text-red-400">*</span>
        </label>
        <input
          name="title"
          required
          defaultValue={product?.title}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A843]"
          placeholder="Nom du produit"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description <span className="text-red-400">*</span>
        </label>
        <textarea
          name="description"
          required
          defaultValue={product?.description}
          rows={4}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A843] resize-y"
          placeholder="Description du produit..."
        />
      </div>

      {/* Price + Stock + Weight */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prix (€) <span className="text-red-400">*</span>
          </label>
          <input
            name="price_euros"
            type="number"
            step="0.01"
            min="0"
            required
            defaultValue={product ? (product.price_cents / 100).toFixed(2) : ''}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A843]"
            placeholder="0.00"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stock <span className="text-red-400">*</span>
          </label>
          <input
            name="stock"
            type="number"
            min="0"
            required
            defaultValue={product?.stock ?? 0}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A843]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Poids (g)
          </label>
          <input
            name="weight_grams"
            type="number"
            min="0"
            defaultValue={product?.weight_grams ?? ''}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A843]"
            placeholder="Optionnel"
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Catégorie <span className="text-red-400">*</span>
        </label>
        <select
          name="category"
          required
          defaultValue={product?.category ?? ''}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A843] bg-white"
        >
          <option value="">Choisir une catégorie</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c} className="capitalize">
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Checkboxes */}
      <div className="flex gap-8">
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input
            type="hidden"
            name="is_active"
            value="false"
          />
          <input
            type="checkbox"
            name="is_active"
            value="true"
            defaultChecked={product ? product.is_active : true}
            className="w-4 h-4 accent-[#D4A843]"
          />
          Produit actif
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input
            type="hidden"
            name="is_popular"
            value="false"
          />
          <input
            type="checkbox"
            name="is_popular"
            value="true"
            defaultChecked={product?.is_popular ?? false}
            className="w-4 h-4 accent-[#D4A843]"
          />
          Populaire 🔥
        </label>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={uploading}
          className="bg-[#D4A843] hover:bg-[#B8902F] disabled:opacity-50 text-[#111111] font-bold px-6 py-2.5 rounded-xl text-sm transition-colors"
        >
          {product ? 'Enregistrer les modifications' : 'Créer le produit'}
        </button>
        <a
          href="/admin/produits"
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-6 py-2.5 rounded-xl text-sm transition-colors"
        >
          Annuler
        </a>
      </div>
    </form>
  )
}
