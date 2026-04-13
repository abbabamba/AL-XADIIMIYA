import Link from "next/link";
import { getAllEventsAdmin } from "@/data/events";
import EventToggle from "./_components/EventToggle";
import DeleteEventButton from "./_components/DeleteEventButton";

export default async function AdminEventsPage() {
  const events = await getAllEventsAdmin();

  return (
    <div className="p-6 lg:p-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#111111]">Événements</h1>
          <p className="text-sm text-gray-500 mt-1">{events.length} événement{events.length !== 1 ? "s" : ""} au total</p>
        </div>
        <Link
          href="/admin/evenements/new"
          className="inline-flex items-center gap-2 bg-[#D4A843] text-[#111111] font-bold px-5 py-2.5 rounded-xl hover:bg-[#E8C97A] transition-colors text-sm"
        >
          + Créer un événement
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-2xl">
          <p className="text-gray-400 text-lg">Aucun événement pour le moment</p>
          <Link
            href="/admin/evenements/new"
            className="mt-4 inline-flex items-center gap-2 text-[#D4A843] font-semibold hover:underline text-sm"
          >
            Créer le premier →
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Titre</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Lieu</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Publié</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {events.map((event) => {
                const date = new Date(event.event_date);
                return (
                  <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4">
                      <p className="font-semibold text-gray-900 line-clamp-1">{event.title}</p>
                    </td>
                    <td className="px-4 py-4 hidden sm:table-cell text-gray-600">
                      {date.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" })}
                      <span className="block text-xs text-gray-400">
                        {date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell text-gray-600">
                      {event.location ?? <span className="text-gray-300 italic">—</span>}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <EventToggle id={event.id} published={event.is_published} />
                    </td>
                    <td className="px-4 py-4 text-right">
                      <DeleteEventButton id={event.id} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
