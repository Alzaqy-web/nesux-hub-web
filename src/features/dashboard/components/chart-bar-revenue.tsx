"use client";

import { useSession } from "next-auth/react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import useGetAdminTransactions from "@/features/dashboard/transactions/api/useGetAdminTransactions";

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const ChartDashboardRevenue = () => {
  const { data: session } = useSession();
  const accessToken = session?.user?.accessToken;

  const { data: transactionData, isPending } =
    useGetAdminTransactions(accessToken);

  // Buat list 4 bulan terakhir (termasuk bulan sekarang)
  const now = new Date();
  const monthNames = Array.from({ length: 4 }, (_, i) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (3 - i));
    return date.toLocaleString("en-US", { month: "long" });
  });

  // Inisialisasi revenue 0 untuk semua bulan
  const monthlyRevenueMap: Record<string, number> = {};
  monthNames.forEach((month) => {
    monthlyRevenueMap[month] = 0;
  });

  // Hitung totalPrice dari transaksi untuk masing-masing bulan
  transactionData?.data?.forEach((tx) => {
    const createdAt = new Date(tx.createdAt);
    const month = createdAt.toLocaleString("en-US", { month: "long" });

    if (monthNames.includes(month)) {
      monthlyRevenueMap[month] += tx.totalPrice ?? 0;
    }
  });

  // Siapin data akhir untuk chart
  const chartData = monthNames.map((month) => ({
    month,
    revenue: monthlyRevenueMap[month],
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview Revenue</CardTitle>
        <CardDescription>Revenue by Month</CardDescription>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <p className="text-muted-foreground text-sm">Loading chart...</p>
        ) : (
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={5}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)} // Jan, Feb, dst.
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="revenue" fill="#f97316" radius={8} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Showing total revenue <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          for the last 4 months
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChartDashboardRevenue;
