import React from "react";
import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";

interface EventDetailsCardProps {
  events: {
    title: string;
    slug: string;
    thumbnail: string;
    startDate: string;
    endDate: string;
    location?: string;
  };
  formatDate: (dateString: string, includeTime?: boolean) => string;
}

const EventDetailsCard: React.FC<EventDetailsCardProps> = ({
  events,
  formatDate,
}) => {
  return (
    <div className="rounded-lg border border-gray-800 bg-gray-800 p-6 shadow-lg">
      <h2 className="mb-4 text-2xl font-bold text-white">Detail Event</h2>
      {events.thumbnail && (
        <div className="relative mb-4 h-48 w-full overflow-hidden rounded-lg">
          <Image
            src={events.thumbnail}
            alt={events.title}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-lg"
          />
        </div>
      )}
      <h3 className="mb-2 text-xl font-bold text-white">{events.title}</h3>
      <div className="mb-1 flex items-center text-sm text-gray-300">
        <MapPin className="mr-2 h-4 w-4 text-gray-400" />
        <span>{events.location || "Online Event"}</span>
      </div>
      <div className="mb-1 flex items-center text-sm text-gray-300">
        <CalendarDays className="mr-2 h-4 w-4 text-gray-400" />
        <span>
          {formatDate(events.startDate, false)} -{" "}
          {formatDate(events.endDate, false)}
        </span>
      </div>
      <div className="flex items-center text-sm text-gray-300">
        <CalendarDays className="mr-2 h-4 w-4 text-gray-400" />
        <span>
          {new Date(events.startDate).toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          -{" "}
          {new Date(events.endDate).toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          WITA
        </span>
      </div>
    </div>
  );
};

export default EventDetailsCard;
