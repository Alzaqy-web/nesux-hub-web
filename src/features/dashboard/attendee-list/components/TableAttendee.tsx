"use client";

import { useSession } from "next-auth/react";
import { useQueryState, parseAsInteger } from "nuqs";
import { Loader } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PaginationSection from "@/components/PaginationSection";
import useGetAdminTransactions from "@/features/dashboard/transactions/api/useGetAdminTransactions";

const formatRupiah = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);

const TableAttendee = () => {
  const { data: session } = useSession();
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const { data: fetchedTransactions, isPending } = useGetAdminTransactions(
    session?.user?.accessToken,
    {
      page,
      take: 5,
    },
  );

  if (isPending) {
    return (
      <div className="flex justify-center py-10">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead>Event</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fetchedTransactions?.data.map((t) => (
            <TableRow key={t.id}>
              <TableCell>{t.events?.title}</TableCell>
              <TableCell>{t.user?.name}</TableCell>
              <TableCell>{t.user?.email}</TableCell>
              <TableCell>{t.quantity} Ticket</TableCell>
              <TableCell>{formatRupiah(t.totalPrice)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {fetchedTransactions && (
        <PaginationSection
          page={fetchedTransactions.meta.page}
          take={fetchedTransactions.meta.take}
          total={fetchedTransactions.meta.total}
          setPage={setPage}
        />
      )}
    </div>
  );
};

export default TableAttendee;
