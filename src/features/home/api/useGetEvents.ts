// kushus untuk method get data pakai useQuery

import { axiosInstance } from "@/lib/axios";
import { PagebleResponse, PaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

interface GetEventsQuery extends PaginationQueries {
  search?: string;
  category?: string;
  sortBy?: "latest" | "oldest" | "price";
}

const useGetEvents = (queries?: GetEventsQuery) => {
  return useQuery({
    queryKey: ["events", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PagebleResponse<Event>>(
        "/events",
        { params: queries ?? {} },
      );

      return data;
    },
  });
};

export default useGetEvents;
