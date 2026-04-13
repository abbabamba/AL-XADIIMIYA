'use server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function toggleProductActive(id: string, is_active: boolean) {
  await supabaseAdmin.from('products').update({ is_active }).eq('id', id)
  revalidatePath('/admin/produits')
}

export async function toggleProductPopular(id: string, is_popular: boolean) {
  await supabaseAdmin.from('products').update({ is_popular }).eq('id', id)
  revalidatePath('/admin/produits')
}

export async function deleteProduct(id: string) {
  await supabaseAdmin.from('products').delete().eq('id', id)
  revalidatePath('/admin/produits')
}

export async function upsertProduct(formData: FormData) {
  const id = formData.get('id') as string | null
  const payload = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    price_cents: Math.round(parseFloat(formData.get('price_euros') as string) * 100),
    category: formData.get('category') as string,
    stock: parseInt(formData.get('stock') as string, 10),
    weight_grams: formData.get('weight_grams')
      ? parseInt(formData.get('weight_grams') as string, 10)
      : null,
    image_url: (formData.get('image_url') as string) || null,
    is_popular: formData.get('is_popular') === 'true',
    is_active: formData.get('is_active') === 'true',
  }

  if (id) {
    await supabaseAdmin.from('products').update(payload).eq('id', id)
  } else {
    await supabaseAdmin.from('products').insert(payload)
  }

  revalidatePath('/admin/produits')
  redirect('/admin/produits')
}
