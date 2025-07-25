import { axiosInstance } from "@/lib/axios";
import { Event } from "@/types/event";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";
// import { useSession } from "next-auth/react";

const useGetAdminEvents = (
  accessToken?: string,
  queries?: PaginationQueries,
) => {
  // const session = useSession();

  return useQuery({
    queryKey: ["events-admin", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Event>>(
        "/events/admin",
        {
          params: queries,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      return data;
    },
  });
};

export default useGetAdminEvents;
