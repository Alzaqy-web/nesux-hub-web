import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Event } from "@/types/event";

const useGetEventBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["events", slug],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Event>(`/events/${slug}`);
      return data;
    },
  });
};

export default useGetEventBySlug;
