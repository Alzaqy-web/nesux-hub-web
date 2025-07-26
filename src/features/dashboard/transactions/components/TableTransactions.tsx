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
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import { parseAsInteger, useQueryState } from "nuqs";
import { toast } from "sonner";
import {
  approvalTransaction,
  rejectTransaction,
} from "../api/updatePaymentStatus";
import useGetAdminTransactions from "../api/useGetAdminTransactions";

const TableTransactions = () => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const { data: session } = useSession();

  const {
    data: transactions,
    isPending,
    refetch,
  } = useGetAdminTransactions(session?.user?.accessToken, {
    page,
    take: 5,
  });

  const { mutateAsync: approve } = useMutation({
    mutationFn: (id: number) => approvalTransaction(id, session),
    onSuccess: async () => {
      toast.success("Transaction approved");
      await refetch();
    },
    onError: (error) => {
      console.error("APPROVE FAILED:", error);
      toast.error("Failed to approve transaction");
    },
  });

  const { mutateAsync: reject } = useMutation({
    mutationFn: (id: number) => rejectTransaction(id, session),
    onSuccess: async () => {
      toast.success("Transaction rejected");
      await refetch();
    },
    onError: (error) => {
      console.error("REJECT FAILED:", error);
      toast.error("Failed to reject transaction");
    },
  });

  return (
    <div className="space-y-4 px-6">
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
                  <Button
                    className="bg-orange-400 text-white"
                    onClick={() => {
                      if (transaction.payments?.proofUrl) {
                        window.open(transaction.payments.proofUrl, "_blank");
                      } else {
                        toast.warning("Bukti pembayaran tidak tersedia.");
                      }
                    }}
                  >
                    View Proof
                  </Button>
                </TableCell>
                <TableCell className="space-x-2 text-right">
                  <Button
                    className="bg-green-700 text-white"
                    onClick={async () => await approve(transaction.id)}
                  >
                    Accept
                  </Button>
                  <Button
                    className="bg-red-500 text-white"
                    onClick={async () => await reject(transaction.id)}
                  >
                    Reject
                  </Button>
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
