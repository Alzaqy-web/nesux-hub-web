// src/app/events/[slug]/components/EventDetailBody.tsx
import { Event } from "@/types/event";
import Markdown from "@/components/Markdown"; // Pastikan Anda memiliki komponen Markdown

interface EventDetailBodyProps {
  event: Event;
}
const EventDetailBody = ({ event }: EventDetailBodyProps) => {
  return (
    <section className="mt-4 space-y-4">
      <h2 className="text-xl font-bold text-gray-800">Event</h2>
      <div className="prose max-w-none">
        <Markdown content={event.content} />
      </div>
    </section>
  );
};

export default EventDetailBody;
