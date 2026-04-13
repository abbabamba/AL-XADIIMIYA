import { supabase } from "@/lib/supabase";

// Matches the Supabase `products` table schema exactly
export type Product = {
  id: string;
  title: string;
  description: string;
  price_cents: number;
  image_url: string | null;
  category: string;
  stock: number;
  is_active: boolean;
  is_popular: boolean;
  weight_grams: number | null;
  created_at: string;
  updated_at: string;
};

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching products:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .eq("is_active", true)
    .single();

  if (error) return null;
  return data;
}
