// src/app/events/[slug]/components/EventInfoCard.tsx
import { Event } from "@/types/event";
import { format } from "date-fns";
import {
  MapPinIcon,
  CalendarDaysIcon,
  ClockIcon,
  UserIcon,
} from "lucide-react";
import { id } from "date-fns/locale";

interface EventInfoCardProps {
  event: Event;
}

const EventInfoCard = ({ event }: EventInfoCardProps) => {
  const formattedEventDate = (
    <>
      {format(new Date(event.startDate), "dd MMM yyyy", { locale: id })} -{" "}
      {format(new Date(event.endDate), "dd MMM yyyy", { locale: id })}
    </>
  );

  const formattedEventTime = (
    <>
      {format(new Date(event.startDate), "HH:mm")} -{" "}
      {format(new Date(event.endDate), "HH:mm")} WITA
    </>
  );

  return (
    <div className="space-y-3 rounded-lg border p-4 shadow-lg">
      <h2 className="text-xl font-bold">{event.title}</h2>

      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <MapPinIcon className="h-4 w-4 text-gray-500" />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDaysIcon className="h-4 w-4 text-gray-500" />
          <span>{formattedEventDate}</span>
        </div>
        <div className="flex items-center gap-2">
          <ClockIcon className="h-4 w-4 text-gray-500" />
          <span>{formattedEventTime}</span>
        </div>
        <div className="flex items-center gap-2">
          <UserIcon className="h-4 w-4 text-gray-500" />
          <span>{event.user?.name || "Penyelenggara Event"}</span>
        </div>
      </div>
    </div>
  );
};

export default EventInfoCard;
