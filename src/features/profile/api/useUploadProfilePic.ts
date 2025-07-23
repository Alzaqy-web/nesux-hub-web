import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { getSession } from "next-auth/react";

export const useUploadProfilePic = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      const session = await getSession();

      const token = session?.user?.accessToken;

      const formData = new FormData();
      formData.append("profilePic", file);

      const { data } = await axiosInstance.patch("/profile/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      return data; // -> { imageUrl: "..." }
    },
  });
};
