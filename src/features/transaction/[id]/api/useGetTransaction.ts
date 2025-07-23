"use client";

import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { Transaction } from "@/types/transaction"; // Pastikan path ini benar

interface UseGetTransactionDetailProps {
  transactionId: string | number | undefined; // ID transaksi yang akan diambil
  enabled?: boolean; // Untuk mengontrol kapan query dijalankan
}

const useGetTransactionDetail = ({
  transactionId,
  enabled = true,
}: UseGetTransactionDetailProps) => {
  const { data: session } = useSession();

  return useQuery<Transaction, AxiosError<{ message: string }>>({
    // Perbaikan di queryKey:
    // 1. Menggunakan `transactionId` yang merupakan prop dari hook.
    // 2. Format array queryKey: ['namaKey', dependency1, dependency2, ...]
    queryKey: ["transactionDetail", transactionId], // Menggunakan nama key yang lebih deskriptif dan ID
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
      return data.data; // Asumsi API mengembalikan { data: Transaction }
    },
    // Hanya jalankan query jika ada ID, session, dan enabled adalah true
    enabled: enabled && !!transactionId && !!session?.user.accessToken,
    staleTime: 1000 * 60 * 5, // Data dianggap fresh selama 5 menit
    gcTime: 1000 * 60 * 10, // Data akan di-garbage collect setelah 10 menit tidak digunakan
    retry: 1, // Coba ulang 1 kali jika gagal
  });
};

export default useGetTransactionDetail;
