import { axiosInstance } from "@/lib/axios";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { Transaction } from "@/types/transaction";
import { useQuery } from "@tanstack/react-query";

const useGetAdminTransactions = (
  accessToken?: string,
  queries?: PaginationQueries,
) => {
  // const session = useSession();

  return useQuery({
    queryKey: ["transactions-admin", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Transaction>>(
        "/transactions/admin",
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

export default useGetAdminTransactions;
