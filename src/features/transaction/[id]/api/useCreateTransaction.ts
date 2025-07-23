"use client";

import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CreateTransactionPayload } from "@/types/transaction"; // Import payload type

const useCreateTransaction = () => {
  const session = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<
    any,
    AxiosError<{ message: string }>,
    CreateTransactionPayload
  >({
    mutationFn: async (payload: CreateTransactionPayload) => {
      // Mengirim payload sebagai JSON, bukan FormData
      const { data } = await axiosInstance.post("/transactions", payload, {
        headers: {
          Authorization: `Bearer ${session.data?.user.accessToken}`,
          "Content-Type": "application/json", // Penting untuk JSON
        },
      });
      return data;
    },

    onSuccess: async (data) => {
      toast.success("Create transaction success");
      await queryClient.invalidateQueries({ queryKey: ["transactions"] }); // Invalidate all transactions list
      // Jika API mengembalikan ID transaksi yang baru dibuat, Anda bisa mengarahkannya ke halaman detail transaksi
      // Asumsi data.data.id adalah ID transaksi baru
      if (data?.data?.id) {
        router.push(`/transactions`); // Ganti dengan path detail transaksi Anda ${data.data.id}
      } else {
        router.push("/"); // Atau ke halaman daftar transaksi
      }
    },

    onError: (error: AxiosError<{ message: string }>) => {
      console.error("Error creating transaction: ", error);
      toast.error(
        error.response?.data.message ||
          "An unexpected error occurred while creating transaction.",
      );
    },
  });
};

export default useCreateTransaction;
