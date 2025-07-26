"use client";

import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { AxiosError } from "axios";

interface EditProfilePayload {
  name?: string;
  email?: string;
  password?: string;
  profilePic?: File | null;
}

const useEditProfile = (id: number, session: Session | null) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: EditProfilePayload) => {
      const formData = new FormData();

      if (payload.name) formData.append("name", payload.name);
      if (payload.email) formData.append("email", payload.email);
      if (payload.password) formData.append("password", payload.password);
      if (payload.profilePic) formData.append("profilePic", payload.profilePic);

      const { data } = await axiosInstance.patch(`/profile/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      });

      return data;
    },

    onSuccess: async () => {
      toast.success("Profile updated successfully!");
      router.push("/dashboard/profile");

      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      }, 1000);
    },

    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message || "Something went wrong.");
    },
  });
};

export default useEditProfile;
