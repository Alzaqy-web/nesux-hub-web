import { Badge } from "@/components/ui/badge";
import { Event } from "@/types/event";
import { format } from "date-fns";
import Image from "next/image";
import { id } from "date-fns/locale";

interface EventDetailHeaderProps {
  event: Event;
}

const EventDetailHeader = ({ event }: EventDetailHeaderProps) => {
  return (
    <section className="space-y-2 rounded-b-lg">
      <Badge
        variant="outline"
        className="rounded-sm bg-green-100 font-bold text-green-600 capitalize"
      >
        {event.category}
      </Badge>

      <h1 className="text-2xl font-bold md:text-3xl">{event.title}</h1>

      <p>
        {format(event.createdAt, "dd MMM yyy")}- {event.user?.name}
      </p>

      {/* jika diperlukan admin */}
      {/* <p className="text-sm text-gray-500">
        Dipublikasikan pada{" "}
        {format(new Date(event.createdAt), "dd MMMM yyyy", { locale: id })} oleh{" "}
        <span className="font-medium">{event.user?.name || "Admin"}</span>
      </p> */}

      <div className="relative h-[220px] overflow-hidden rounded-lg sm:h-[280px] md:h-[360px]">
        <Image
          src={event.thumbnail}
          alt="thumbnail"
          className="rounded-sm object-cover"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1200px) 60vw, 50vw"
        />
      </div>
    </section>
  );
};

export default EventDetailHeader;
