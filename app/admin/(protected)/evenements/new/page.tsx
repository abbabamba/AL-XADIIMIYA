import Link from "next/link";
import EventForm from "../_components/EventForm";

export default function NewEventPage() {
  return (
    <div className="p-6 lg:p-8 max-w-2xl">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/evenements"
          className="text-sm text-[#D4A843] hover:text-[#E8C97A] transition-colors mb-4 inline-flex items-center gap-1"
        >
          ← Retour aux événements
        </Link>
        <h1 className="text-2xl font-bold text-[#111111] mt-2">Créer un événement</h1>
      </div>

      <EventForm />
    </div>
  );
}
