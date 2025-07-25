"use client";

import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { Transaction } from "@/types/transaction";

interface UseGetTransactionDetailProps {
  transactionId: string | number | undefined;
  enabled?: boolean;
}

const useGetTransactionDetail = ({
  transactionId,
  enabled = true,
}: UseGetTransactionDetailProps) => {
  const { data: session } = useSession();

  return useQuery<Transaction, AxiosError<{ message: string }>>({
    queryKey: ["transactionDetail", transactionId],
    queryFn: async () => {
      if (!transactionId) {
        throw new Error("Transaction ID is required");
      }
      const { data } = await axiosInstance.get(
        `/transactions/${transactionId}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
        },
      );
      return data.data;
    },
    enabled: enabled && !!transactionId && !!session?.user.accessToken,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
  });
};

export default useGetTransactionDetail;
