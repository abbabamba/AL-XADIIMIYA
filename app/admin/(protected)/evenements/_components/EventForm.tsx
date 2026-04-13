'use client'
import { useRef, useState } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'
import { createEvent } from '../actions'

export default function EventForm() {
  const [imageUrl, setImageUrl]     = useState('')
  const [preview, setPreview]       = useState('')
  const [uploading, setUploading]   = useState(false)
  const [uploadError, setUploadError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadError('')

    // Aperçu local immédiat
    setPreview(URL.createObjectURL(file))

    setUploading(true)
    const supabase = createSupabaseBrowserClient()
    const ext = file.name.split('.').pop()
    const fileName = `${crypto.randomUUID()}.${ext}`

    const { data, error } = await supabase.storage
      .from('event-images')
      .upload(fileName, file, { upsert: true })

    if (error || !data) {
      setUploadError("Erreur lors de l'upload. Vérifiez le bucket Supabase.")
      setUploading(false)
      return
    }

    const { data: urlData } = supabase.storage
      .from('event-images')
      .getPublicUrl(data.path)

    setImageUrl(urlData.publicUrl)
    setUploading(false)
  }

  return (
    <form action={createEvent} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
      {/* Champ caché image_url — transmis au server action */}
      <input type="hidden" name="image_url" value={imageUrl} />

      {/* Titre */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="title">
          Titre <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          placeholder="Ex: Marché africain de printemps"
          className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#D4A843] transition-colors"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          placeholder="Décrivez l'événement..."
          className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#D4A843] transition-colors resize-none"
        />
      </div>

      {/* Date + heure */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="event_date">
          Date et heure <span className="text-red-500">*</span>
        </label>
        <input
          id="event_date"
          name="event_date"
          type="datetime-local"
          required
          className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#D4A843] transition-colors"
        />
      </div>

      {/* Lieu */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="location">
          Lieu
        </label>
        <input
          id="location"
          name="location"
          type="text"
          placeholder="Ex: Paris 15ème, Salle des fêtes"
          className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#D4A843] transition-colors"
        />
      </div>

      {/* Upload image */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Image de l&apos;événement
        </label>
        <div className="flex gap-4 items-start">
          {/* Aperçu */}
          {preview ? (
            <img
              src={preview}
              alt="Aperçu"
              className="w-24 h-24 object-cover rounded-xl border border-gray-200 flex-shrink-0"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center text-2xl flex-shrink-0">
              📅
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
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-4 py-2.5 rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {uploading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  Upload en cours…
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 11V3M5 6l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  {preview ? 'Changer l\'image' : 'Choisir une image'}
                </>
              )}
            </button>
            <p className="text-xs text-gray-400 mt-1.5">JPG, PNG, WebP — max 5 Mo</p>
            {uploadError && (
              <p className="text-red-500 text-xs mt-1">{uploadError}</p>
            )}
            {imageUrl && !uploading && (
              <p className="text-green-600 text-xs mt-1 flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Image uploadée avec succès
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Publié toggle */}
      <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-200">
        <input
          id="is_published"
          name="is_published"
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 accent-[#D4A843]"
        />
        <div>
          <label htmlFor="is_published" className="text-sm font-semibold text-gray-700 cursor-pointer">
            Publier immédiatement
          </label>
          <p className="text-xs text-gray-400 mt-0.5">L&apos;événement sera visible sur le site public.</p>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={uploading}
        className="w-full bg-[#D4A843] text-[#111111] font-bold py-4 rounded-xl text-base hover:bg-[#E8C97A] transition-colors disabled:opacity-50"
      >
        Créer l&apos;événement
      </button>
    </form>
  )
}
