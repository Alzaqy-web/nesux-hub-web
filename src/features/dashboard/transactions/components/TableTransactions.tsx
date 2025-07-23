"use client";

import PaginationSection from "@/components/PaginationSection";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader } from "lucide-react";
import Link from "next/link";
import { parseAsInteger, useQueryState } from "nuqs";
import useGetAdminTransactions from "../api/useGetAdminTransactions";

const TableTransactions = () => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const { data: transactions, isPending } = useGetAdminTransactions({
    page,
    take: 8,
  });

  return (
    <div className="space-y-4">
      {isPending ? (
        <Loader className="mt-24 flex w-full animate-spin items-center justify-center" />
      ) : (
        <Table className="border">
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment Proof</TableHead>
              <TableHead className="pr-15 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="border">
            {transactions?.data.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.status}</TableCell>
                <TableCell>{transaction.events?.title}</TableCell>
                <TableCell>{transaction.totalPrice}</TableCell>
                <TableCell>
                  <Button className="bg-orange-400 text-white">
                    <Link
                      href={
                        "https://res.cloudinary.com/sosmed-daniel/image/upload/c8o0exixqfnvubtlz2gh.png"
                      }
                      target="_blank"
                    >
                      View Proof
                    </Link>
                  </Button>
                </TableCell>
                <TableCell className="space-x-2 text-right">
                  <Button className="bg-green-700 text-white">Accept</Button>
                  <Button className="bg-red-500 text-white">Reject</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {transactions && (
        <PaginationSection
          page={transactions.meta.page}
          take={transactions.meta.take}
          total={transactions.meta.total}
          setPage={setPage}
        />
      )}
    </div>
  );
};

export default TableTransactions;
