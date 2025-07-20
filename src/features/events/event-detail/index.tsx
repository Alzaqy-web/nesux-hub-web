// src/app/events/[slug]/page.tsx
"use client";

import Loading from "@/components/Loading";
import NoData from "@/components/NoData";

import useGetEventBySlug from "./api/useGetEventBySlug";

import EventDetailHeader from "./components/EventDetailHeader";
import EventDetailBody from "./components/EventDetailBody";
import EventInfoCard from "./components/EventInfocard";
import EventTicketSection from "./components/EventTicketSection";

interface EventDetailPageProps {
  slug: string;
}

const EventDetailPage = ({ slug }: EventDetailPageProps) => {
  const { data: event, isPending, isError } = useGetEventBySlug(slug);

  if (isPending) {
    return <Loading />;
  }

  if (isError || !event) {
    return <NoData />;
  }

  return (
    <main className="container mx-auto p-4">
      <div className="grid grid-cols-1 gap-6 rounded-xl border-1 p-2 md:grid-cols-3">
        {/* Kolom Kiri: Header dan Body Event */}
        <div className="space-y-6 md:col-span-2">
          <EventDetailHeader event={event} />
          <section className="space-y-4">
            <div className="prose max-w-none">
              <EventDetailBody event={event} />
            </div>
          </section>
        </div>

        {/* Kolom Kanan: Sidebar dengan Info Card dan Ticket Section */}
        <div className="mt-27 space-y-8 md:sticky md:top-6 md:col-span-1">
          <EventInfoCard event={event} />
          <EventTicketSection event={event} />
        </div>
      </div>
    </main>
  );
};

export default EventDetailPage;
