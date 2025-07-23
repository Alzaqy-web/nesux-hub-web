"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const FormRegister = () => {
  const router = useRouter();

  return (
    <div className="mt-[200px] flex flex-col items-center justify-center px-4">
      <h1 className="mb-6 text-2xl font-semibold">Choose Registration Type</h1>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Button onClick={() => router.push("/register-user")}>
          Register as User
        </Button>

        <Button
          variant="outline"
          onClick={() => router.push("/register-event-organizer")}
        >
          Register as Event Organizer
        </Button>
      </div>
    </div>
  );
};

export default FormRegister;
