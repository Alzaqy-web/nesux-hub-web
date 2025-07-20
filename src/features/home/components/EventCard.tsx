import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Event } from "@/types/event";
import Image from "next/image";
import Link from "next/link";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const formatDate = (dateInput: Date | string) => {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) {
      console.error("Invalid date input:", dateInput);
      return "Invalid Date";
    }
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const minPrice = event.tickets?.length
    ? Math.min(...event.tickets.map((t) => t.price))
    : null;

  const totalSeats = Array.isArray(event.tickets)
    ? event.tickets.reduce((acc, t) => acc + (t.availableSeats || 0), 0)
    : 0;

  return (
    <Link href={`/events/${event.slug}`}>
      <Card className="flex h-full flex-col">
        <CardHeader className="">
          <div className="relative h-[220px] w-full overflow-hidden rounded-lg">
            <Image
              src={event.thumbnail}
              alt="thumbnail"
              className="object-cover"
              fill
            />
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-4">
          <div className="mb-2 flex items-center gap-4">
            <Badge
              variant="outline"
              className="rounded-sm bg-green-100 font-bold text-green-600 capitalize"
            >
              {event.category}
            </Badge>
            {/* pastikan event.user.name ada seblum mengakses event.user.name */}
            {event.user?.name && (
              <p className="text-sm font-light capitalize">{event.user.name}</p>
            )}
          </div>
          <p className="mb-1 text-lg font-semibold">{event.title}</p>
          <p className="line-clamp-4 text-sm text-slate-600">
            {event.description}
          </p>

          {/* Bagian Tanggal */}
          <div className="mt-3 text-sm text-gray-700">
            {event.startDate && event.endDate ? (
              <p>
                <span className="font-medium">
                  🗓️ {formatDate(event.startDate)}
                </span>{" "}
                - {formatDate(event.endDate)}
              </p>
            ) : event.startDate ? (
              <p>
                <span className="font-medium">🗓️ Mulai:</span>{" "}
                {formatDate(event.startDate)}
              </p>
            ) : null}
          </div>

          <div className="mt-4 flex justify-end">
            {/* Harga */}
            {minPrice !== null ? (
              minPrice === 0 ? (
                <p className="text-base font-semibold text-green-600">Free</p>
              ) : (
                <p className="text-base font-semibold text-red-700">
                  Rp. {minPrice.toLocaleString("id-ID")}
                </p>
              )
            ) : (
              <p className="text-sm text-gray-500">Tiket belum tersedia</p>
            )}

            {/* stock */}
            {/* {Array.isArray(event.tickets) && totalSeats > 0 && (
              <p className="text-sm text-slate-600">{totalSeats} stock</p>
            )} */}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default EventCard;
