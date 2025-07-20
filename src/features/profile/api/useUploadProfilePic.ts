import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { getSession } from "next-auth/react"

export const useUploadProfilePic = () => {
  return useMutation({
    
    mutationFn: async (file: File) => {
      
const  session  = await getSession()
console.log(session)
      
      const token = session?.user?.accessToken; 
      console.log("📦 TOKEN:", token);
      
      const formData = new FormData();
      formData.append("profilePic", file);

      const res = await axiosInstance.post("/profile/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data; // -> { imageUrl: "..." }
    },
  });
};
