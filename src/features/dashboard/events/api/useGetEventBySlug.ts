import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const useGetEventBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["event", slug],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/events/${slug}`);
      return data;
    },
    enabled: !!slug,
  });
};

export default useGetEventBySlug;
