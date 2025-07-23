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

const TableEvents = () => {
  const { data: events, isPending } = useGetAdminEvents();

  return (
    <Table className="mt-5 border">
      {isPending && <Loader className="animate-spin" />}
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
                src="/building.jpeg"
                alt="Building"
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
                <Link href={`/dashboard/events/edit-event`}>Edit</Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableEvents;
