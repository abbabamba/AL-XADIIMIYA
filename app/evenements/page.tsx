import type { Metadata } from "next";
import { getUpcomingEvents, getPastEvents } from "@/data/events";
import type { Event } from "@/data/events";
import Image from "next/image";

export const metadata: Metadata = { title: "Événements" };

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return {
    day: d.toLocaleDateString("fr-FR", { day: "2-digit" }),
    month: d.toLocaleDateString("fr-FR", { month: "short" }).toUpperCase(),
    full: d.toLocaleDateString("fr-FR", {
      weekday: "long", day: "numeric", month: "long", year: "numeric",
    }),
    time: d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
  };
}

function EventCard({ event, past = false }: { event: Event; past?: boolean }) {
  const date = formatDate(event.event_date);
  return (
    <div className={`bg-white rounded-2xl overflow-hidden shadow-sm border transition-all duration-300 hover:shadow-lg hover:-translate-y-1
      ${past ? "border-gray-200 opacity-70" : "border-cream-dark hover:border-gold/30"}`}>
      {/* Image */}
      {event.image_url && (
        <div className="relative h-48 w-full">
          <Image
            src={event.image_url}
            alt={event.title}
            fill
            className="object-cover"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      )}

      <div className="flex">
        {/* Date badge */}
        <div className={`flex-shrink-0 w-20 flex flex-col items-center justify-center py-6 border-r
          ${past ? "bg-gray-50 border-gray-200" : "bg-dark border-gold/20"}`}>
          <span className={`font-playfair text-3xl font-bold ${past ? "text-gray-400" : "text-gold"}`}>
            {date.day}
          </span>
          <span className={`text-xs tracking-wider ${past ? "text-gray-400" : "text-gold/60"}`}>
            {date.month}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 p-5">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="font-playfair text-lg font-semibold text-dark leading-snug">
              {event.title}
            </h3>
            <span className={`flex-shrink-0 text-xs font-bold px-3 py-1 rounded-full
              ${past ? "bg-gray-100 text-gray-500" : "bg-green-100 text-green-700"}`}>
              {past ? "Passé" : "À venir"}
            </span>
          </div>

          {event.location && (
            <p className="text-sm text-dark/60 flex items-center gap-1 mb-2">
              <span>📍</span>{event.location}
            </p>
          )}

          <p className="text-dark/50 text-xs mb-2">
            {date.full} à {date.time}
          </p>

          {event.description && (
            <p className="text-dark/60 text-sm leading-relaxed line-clamp-3">
              {event.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default async function EventsPage() {
  const [upcoming, past] = await Promise.all([getUpcomingEvents(), getPastEvents()]);

  return (
    <main>
      {/* Hero */}
      <section className="relative bg-dark py-16 sm:py-20 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-gold/5 blur-[100px]" />
        </div>
        <div className="relative z-10 text-center px-4">
          <p className="text-xs tracking-[0.4em] text-gold/60 uppercase mb-3">Agenda</p>
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-cream mb-4">
            Nos Événements
          </h1>
          <p className="text-cream/50 text-base sm:text-lg max-w-xl mx-auto">
            Retrouvez-nous lors de nos marchés, dégustations et événements culturels.
          </p>
          <div className="mt-10 h-8 overflow-hidden pointer-events-none">
            <svg viewBox="0 0 1200 48" preserveAspectRatio="none" className="w-full h-full">
              <path d="M0,24 C200,48 400,0 600,24 C800,48 1000,0 1200,24 L1200,48 L0,48 Z" fill="#FAFAF7" />
            </svg>
          </div>
        </div>
      </section>

      <div className="bg-cream min-h-screen">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">

          {/* À venir */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-gold/20" />
              <h2 className="font-playfair text-2xl font-bold text-dark">À venir</h2>
              <div className="h-px flex-1 bg-gold/20" />
            </div>

            {upcoming.length === 0 ? (
              <div className="text-center py-16 border border-gold/20 rounded-2xl bg-white">
                <p className="font-playfair text-xl text-dark/40 italic">
                  Aucun événement pour le moment
                </p>
                <p className="text-dark/30 text-sm mt-2">
                  Restez connectés pour nos prochaines dates !
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2">
                {upcoming.map((e) => <EventCard key={e.id} event={e} />)}
              </div>
            )}
          </section>

          {/* Passés */}
          {past.length > 0 && (
            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-gray-200" />
                <h2 className="font-playfair text-2xl font-bold text-dark/50">Passés</h2>
                <div className="h-px flex-1 bg-gray-200" />
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                {past.map((e) => <EventCard key={e.id} event={e} past />)}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
