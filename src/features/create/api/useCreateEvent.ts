// "use client";

// import { axiosInstance } from "@/lib/axios";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { AxiosError } from "axios";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";

// interface payload {
//   title: string;
//   category: string;
//   description: string;
//   content: string;
//   thumbnail: File | null;
//   location: string;
//   startDate: string;
//   endDate: string;
//   name: string;
//   type: string;
//   price: number;
//   availableSeats: number;
// }

// const useCreateEvent = () => {
//   const session = useSession();
//   const router = useRouter();
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (payload: payload) => {
//       console.log("Mutation started with payload:", payload);
//       const formData = new FormData();
//       const startDateObj = new Date(payload.startDate);
//       const endDateObj = new Date(payload.endDate);

//       formData.append("title", payload.title);
//       formData.append("category", payload.category);
//       formData.append("description", payload.description);
//       formData.append("content", payload.content);
//       // formData.append("thumbnail", payload.thumbnail!);
//       if (payload.thumbnail) {
//         formData.append("thumbnail", payload.thumbnail);
//       }

//       formData.append("location", payload.location);
//       formData.append("startDate", startDateObj.toISOString());
//       formData.append("endDate", endDateObj.toISOString());
//       formData.append("name", payload.name);
//       formData.append("type", payload.type);
//       formData.append("price", payload.price.toString());
//       formData.append("availableSeats", payload.availableSeats.toString());

//       try {
//         const response = await axiosInstance.post("/events", formData, {
//           headers: {
//             Authorization: `Bearer ${session.data?.user.accessToken}`,
//           },
//         });
//         return response.data;
//       } catch (error) {
//         console.error("Error creating event:", error);
//         throw error;
//       }
//       const { data } = await axiosInstance.post("/events", formData, {
//         headers: {
//           Authorization: `Bearer ${session.data?.user.accessToken}`,
//         },
//       });
//       return data;
//     },

//     onSuccess: async () => {
//       console.log("Event created successfully");
//       toast.success("Create event success");
//       await queryClient.invalidateQueries({ queryKey: ["events"] });
//       router.push("/");
//     },

//     onError: (error: AxiosError<{ message: string }>) => {
//       console.error("Error creating event:", error);
//       toast.error(error.response?.data.message);
//     },
//   });
// };

// export default useCreateEvent;

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
  name: string;
  type: string;
  price: number;
  availableSeats: number;
}

const useCreateEvent = () => {
  const session = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: payload) => {
      console.log("Mutation started with payload:", payload); // Log untuk debugging
      const formData = new FormData();
      const startDateObj = new Date(payload.startDate);
      const endDateObj = new Date(payload.endDate);

      formData.append("title", payload.title);
      formData.append("category", payload.category);
      formData.append("description", payload.description);
      formData.append("content", payload.content);

      // Pastikan thumbnail ditambahkan hanya jika ada
      if (payload.thumbnail) {
        formData.append("thumbnail", payload.thumbnail);
        console.log("Thumbnail appended to FormData."); // Log untuk debugging thumbnail
      } else {
        console.warn("Thumbnail is null, not appending to FormData."); // Peringatan jika thumbnail null
      }

      formData.append("location", payload.location);
      formData.append("startDate", startDateObj.toISOString());
      formData.append("endDate", endDateObj.toISOString());
      formData.append("name", payload.name);
      formData.append("type", payload.type);
      formData.append("price", payload.price.toString());
      formData.append("availableSeats", payload.availableSeats.toString());

      console.log("Attempting to send POST request to /events..."); // Log sebelum request
      try {
        const response = await axiosInstance.post("/events", formData, {
          headers: {
            Authorization: `Bearer ${session.data?.user.accessToken}`,
            // Penting: Untuk FormData, browser akan otomatis mengatur Content-Type: multipart/form-data
            // Anda tidak perlu mengaturnya secara manual di sini.
          },
        });
        console.log(
          "API POST request successful. Response data:",
          response.data,
        ); // Log sukses
        return response.data;
      } catch (error) {
        console.error("API POST request failed. Error object:", error); // Log error
        throw error; // Lempar kembali error agar onError callback bisa menangkapnya
      }
    },

    onSuccess: async () => {
      console.log(
        "Event created successfully! Invalidating queries and redirecting.",
      ); // Log sukses
      toast.success("Create event success");
      await queryClient.invalidateQueries({ queryKey: ["events"] });
      router.push("/");
    },

    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage =
        error.response?.data.message ||
        error.message ||
        "An unknown error occurred.";
      console.error("Event creation failed. Displaying toast:", errorMessage); // Log error
      toast.error(errorMessage);
    },
  });
};

export default useCreateEvent;
