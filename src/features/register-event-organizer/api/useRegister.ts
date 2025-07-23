import { axiosInstance } from "@/lib/axios";
import { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useRegister = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (values: Pick<User, "name" | "email" | "password">) => {
      const { data } = await axiosInstance.post("/auth/register-eo", values);
      return data;
    },
    onSuccess: () => {
      toast.success("register success");
      router.push("/login");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useRegister;
