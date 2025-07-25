import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

const useGetDiscount = () => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ["discount", session?.user?.id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/discount/${session?.user?.id}`, {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      });
      return res.data;
    },
    enabled: !!session?.user?.id,
  });
};

export default useGetDiscount;
