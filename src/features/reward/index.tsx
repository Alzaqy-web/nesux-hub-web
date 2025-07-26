"use client";

import { Card } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import useGetPoint from "./api/useGetPoint";
import TablePoints from "./components/TablePoints";
import { PointHistory } from "@/types/pointHistory";
import useGetDiscount from "./api/useGetDiscount";
import { DiscountHistory } from "@/types/discountHistory";

const RewardPage = () => {
  const session = useSession();

  const { data } = useGetPoint();
  const { data: discountData } = useGetDiscount();

  const totalPoints =
    data?.data?.reduce(
      (acc: number, point: PointHistory) => acc + point.amount,
      0,
    ) ?? 0;

  const formattedPoints = totalPoints.toLocaleString("id-ID");

  const userDiscounts: DiscountHistory[] = discountData?.data ?? [];

  return (
    <div className="min-h-screen p-6 text-white dark:bg-transparent">
      <div className="flex flex-col gap-6 md:flex-row">
        <Card className="w-full space-y-6 border border-zinc-800 bg-zinc-900 p-6 shadow-md md:w-2/3">
          <div className="space-y-1">
            <h2 className="text-2xl leading-snug font-light text-white">
              Hi{" "}
              <span className="font-bold text-white capitalize">
                {session?.data?.user?.name}
              </span>
              ! Lihat history point kamu yukk...
            </h2>
            <p className="text-sm text-gray-300">
              Point didapatkan setiap kali{" "}
              <span className="font-medium text-white">referral code</span> kamu
              digunakan saat registrasi.
            </p>
          </div>

          <div className="text-sm text-gray-400">
            <TablePoints points={data?.data ?? []} />
          </div>
        </Card>

        <div className="flex w-full flex-col gap-6 md:w-1/3">
          <Card className="flex flex-col items-center justify-center py-10 text-white shadow-md">
            <h1 className="text-center text-2xl font-medium text-black dark:text-white">
              Point anda saat ini berjumlah
            </h1>
            <p className="mt-4 text-center text-6xl font-bold text-orange-400">
              {formattedPoints}
            </p>
          </Card>

          <Card className="p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
              Voucher Anda
            </h2>
            {userDiscounts.length === 0 ? (
              <p className="text-sm text-gray-400">
                Belum ada voucher tersedia.
              </p>
            ) : (
              <div className="space-y-3">
                {userDiscounts.map((voucher) => (
                  <div
                    key={voucher.id}
                    className="flex items-center justify-between rounded-lg border border-gray-700 px-4 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-pink-400">🎟️</span>
                      <span className="font-semibold text-white">
                        Diskon {voucher.discount}%
                      </span>
                    </div>

                    <div className="flex flex-1 justify-center">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                          voucher.used
                            ? "bg-red-500/20 text-red-500"
                            : "bg-green-500/20 text-green-500"
                        }`}
                      >
                        {voucher.used ? "Sudah Digunakan" : "Aktif"}
                      </span>
                    </div>

                    <div className="text-xs whitespace-nowrap text-gray-400">
                      Berlaku sampai{" "}
                      {new Date(voucher.expiresAt).toLocaleDateString("id-ID")}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RewardPage;
