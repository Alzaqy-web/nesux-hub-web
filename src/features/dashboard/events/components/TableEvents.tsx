"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import useGetAdminEvents from "../api/useGetAdminEvents";
import { Loader } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import PaginationSection from "@/components/PaginationSection";
import { useSession } from "next-auth/react";
import { parseAsInteger, useQueryState } from "nuqs";

const TableEvents = () => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const { data: session } = useSession();

  const {
    data: events,
    isPending,
    // refetch,
  } = useGetAdminEvents(session?.user?.accessToken, {
    page,
    take: 8,
  });

  return (
    <div className="space-y-4">
      {isPending ? (
        <Loader className="mt-24 flex w-full animate-spin items-center justify-center" />
      ) : (
        <Table className="mt-5 border">
          <TableHeader>
            <TableRow className="items-center">
              <TableHead>Thumbnail</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Action</TableHead>
              {/* <TableHead className="text-right">Status</TableHead> */}
            </TableRow>
          </TableHeader>

          <TableBody>
            {events?.data.map((event) => (
              <TableRow key={event.id}>
                <TableCell>
                  <Image
                    src={event.thumbnail}
                    alt="Thumbnail"
                    width={500}
                    height={500}
                    className="h-20 w-full rounded-xl object-cover"
                  />
                </TableCell>
                <TableCell>{event.title}</TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>{format(event.startDate, "dd MMMM yyyy")}</TableCell>
                <TableCell>{format(event.endDate, "dd MMMM yyyy")}</TableCell>
                <TableCell>
                  <Button className="bg-orange-400 text-white">
                    <Link href={`/dashboard/events/edit-event/${event.slug}`}>
                      Edit
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {events && (
        <PaginationSection
          page={events.meta.page}
          take={events.meta.take}
          total={events.meta.total}
          setPage={setPage}
        />
      )}
    </div>
  );
};

export default TableEvents;
