"use client";

import PaginationSection from "@/components/PaginationSection";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";
import { useDebounceValue } from "usehooks-ts";
import useGetEvents from "../api/useGetEvents";
import NoData from "@/components/NoData";
import EventCard from "./EventCard";
import { Event } from "@/types/event";

const EventList = () => {
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [DebounceValue] = useDebounceValue(search, 500);

  const { data: events, isPending } = useGetEvents({
    page,
    take: 3,
    search: DebounceValue,
  });

  const eventData = events?.data as Event[] | undefined;

  return (
    <>
      <Input
        className="mx-auto mt-8 max-w-xl"
        placeholder="search.."
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />

      <section className="mt-16 grid gap-8 md:grid-cols-3">
        {isPending && (
          <div className="col-span-3 flex h-[30hv] w-full items-center justify-center">
            <Loader className="animate-spin" />
          </div>
        )}

        {!isPending && !events?.data.length && <NoData />}

        {eventData?.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </section>

      {!!events && (
        <div className="mt-4">
          <PaginationSection
            page={events.meta.page}
            take={events.meta.take}
            total={events.meta.total}
            setPage={setPage}
          />
        </div>
      )}
    </>
  );
};

export default EventList;
