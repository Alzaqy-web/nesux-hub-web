// src/app/events/api/useCreateEvent.ts
"use client";

import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface payload {
  title: string;
  category: string;
  description: string;
  content: string;
  thumbnail: File | null;
  location: string;
  startDate: string;
  endDate: string;
}

const useCreateEvent = () => {
  const session = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: payload) => {
      const formData = new FormData();

      const startDateObj = new Date(payload.startDate);
      const endDateObj = new Date(payload.endDate);

      formData.append("title", payload.title);
      formData.append("category", payload.category);
      formData.append("description", payload.description);
      formData.append("content", payload.content);
      formData.append("thumbnail", payload.thumbnail!);
      formData.append("location", payload.location);
      formData.append("startDate", startDateObj.toISOString());
      formData.append("endDate", endDateObj.toISOString());

      const { data } = await axiosInstance.post("/events", formData, {
        headers: {
          // Authorization: `Bearer ${session.data?.user.accessToken}`,
        },
      });
      return data;
    },
    onSuccess: async () => {
      toast.success("Create event success");
      await queryClient.invalidateQueries({ queryKey: ["events"] });
      router.push("/");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.error("Error creating event:", error); // Tambahkan logging lengkap
      toast.error(
        error.response?.data.message || "An unexpected error occurred.",
      );
    },
  });
};

export default useCreateEvent;
