import { axiosInstance } from "@/lib/axios";
import type { Session } from "next-auth";

export const approvalTransaction = async (
  id: number,
  session: Session | null,
) => {
  if (!session) throw new Error("No session");

  const { data } = await axiosInstance.patch(
    `/transactions/approve/${id}`,
    null,
    {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    },
  );
  return data;
};

export const rejectTransaction = async (
  id: number,
  session: Session | null,
) => {
  if (!session) throw new Error("No session");

  const { data } = await axiosInstance.patch(
    `/transactions/reject/${id}`,
    null,
    {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    },
  );
  return data;
};
