import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

const useGetPoint = () => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ["point-history", session?.user?.id],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/point/point-history/${session?.user?.id}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
        },
      );
      return res.data;
    },
    enabled: !!session?.user?.id,
  });
};

export default useGetPoint;
