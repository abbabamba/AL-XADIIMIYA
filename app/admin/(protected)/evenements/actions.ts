"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createEvent(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string | null;
  const event_date = formData.get("event_date") as string;
  const location = formData.get("location") as string | null;
  const image_url = formData.get("image_url") as string | null;
  const is_published = formData.get("is_published") === "on";

  if (!title || !event_date) throw new Error("Titre et date requis");

  await supabaseAdmin.from("events").insert({
    title,
    description: description || null,
    event_date: new Date(event_date).toISOString(),
    location: location || null,
    image_url: image_url || null,
    is_published,
  });

  revalidatePath("/evenements");
  revalidatePath("/admin/evenements");
  revalidatePath("/");
  redirect("/admin/evenements");
}

export async function deleteEvent(id: string) {
  await supabaseAdmin.from("events").delete().eq("id", id);
  revalidatePath("/evenements");
  revalidatePath("/admin/evenements");
  revalidatePath("/");
}

export async function toggleEventPublished(id: string, is_published: boolean) {
  await supabaseAdmin.from("events").update({ is_published }).eq("id", id);
  revalidatePath("/evenements");
  revalidatePath("/admin/evenements");
  revalidatePath("/");
}
