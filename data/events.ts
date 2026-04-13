import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabase-admin";

export type Event = {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  location: string | null;
  image_url: string | null;
  is_published: boolean;
  created_at: string;
};

/** All published upcoming events (public) */
export async function getUpcomingEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("is_published", true)
    .gte("event_date", new Date().toISOString())
    .order("event_date", { ascending: true });
  if (error) return [];
  return data ?? [];
}

/** All published past events (public) */
export async function getPastEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("is_published", true)
    .lt("event_date", new Date().toISOString())
    .order("event_date", { ascending: false });
  if (error) return [];
  return data ?? [];
}

/** All events including drafts (admin only) */
export async function getAllEventsAdmin(): Promise<Event[]> {
  const { data, error } = await supabaseAdmin
    .from("events")
    .select("*")
    .order("event_date", { ascending: true });
  if (error) return [];
  return data ?? [];
}
