"use client";

import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { Session } from "next-auth";

interface Payload extends Omit<Event, "thumbnail"> {
  title?: string;
  description?: string;
  category?: string;
  content?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  thumbnail: File | null;
}

const useEditEvent = (slug: string, session: Session | null) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Partial<Payload>) => {
      const {
        title,
        description,
        category,
        content,
        startDate,
        endDate,
        location,
        thumbnail,
      } = payload;
      const updateEventForm = new FormData();

      if (title) updateEventForm.append("title", title);
      if (description) updateEventForm.append("description", description);
      if (category) updateEventForm.append("category", category);
      if (content) updateEventForm.append("content", content);
      if (startDate) updateEventForm.append("startDate", startDate);
      if (endDate) updateEventForm.append("endDate", endDate);
      if (location) updateEventForm.append("location", location);
      if (thumbnail) updateEventForm.append("thumbnail", thumbnail);

      const { data } = await axiosInstance.patch(
        `/events/${slug}`,
        updateEventForm,
        {
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return data;
    },

    onSuccess: async () => {
      toast.success("Event updated successfully!");
      router.push("/dashboard/events");

      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["events"] });
      }, 1500);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useEditEvent;
