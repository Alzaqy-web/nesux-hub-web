"use client";

import { Card } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { useGetPoints } from "./api/useGetPoint";
import TablePoints from "./components/TablePoints";

const PointPage = () => {
  const session = useSession();

  const points = useGetPoints();

  const formattedPoints = Number(points).toLocaleString("id-ID");

  return (
    <div className="min-h-screen p-6 text-white dark:bg-transparent">
      <div className="flex flex-col gap-6 md:flex-row">
        <Card className="w-full p-6 md:w-2/3">
          <h2 className="text-2xl font-light">
            Hi{" "}
            <span className="font-bold capitalize">
              {session?.data?.user?.name}
            </span>
            ! Lihat history point kamu yukk...
          </h2>
          <div className="text-sm text-gray-400">
            <TablePoints />
          </div>
        </Card>

        <Card className="flex w-full flex-col items-center justify-center py-10 text-white md:w-1/3 dark:bg-transparent">
          <h1 className="center text-3xl font-medium text-black md:text-2xl dark:text-white">
            Point anda saat ini berjumlah
          </h1>
          <p className="text-center text-6xl font-bold text-orange-400 md:text-7xl">
            {formattedPoints}
          </p>
        </Card>
      </div>
    </div>
  );
};

export default PointPage;
