import { useSession } from "next-auth/react";

export const useGetPoints = () => {
  const { data: session } = useSession();
  return session?.user?.points ?? 0;
};
