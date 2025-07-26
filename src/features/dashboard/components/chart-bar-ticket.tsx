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
  tickets: {
    label: "Tickets",
    color: "hsl(var(--chart-2))", // warna bisa disesuaikan
  },
} satisfies ChartConfig;

const ChartDashboardTickets = () => {
  const { data: session } = useSession();
  const accessToken = session?.user?.accessToken;

  const { data: transactionData, isPending } =
    useGetAdminTransactions(accessToken);

  // 4 bulan terakhir
  const now = new Date();
  const monthNames = Array.from({ length: 4 }, (_, i) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (3 - i));
    return date.toLocaleString("en-US", { month: "long" });
  });

  // Inisialisasi semua bulan dengan 0 tiket
  const monthlyTicketMap: Record<string, number> = {};
  monthNames.forEach((month) => {
    monthlyTicketMap[month] = 0;
  });

  // Hitung total quantity per bulan
  transactionData?.data?.forEach((tx) => {
    const createdAt = new Date(tx.createdAt);
    const month = createdAt.toLocaleString("en-US", { month: "long" });

    if (monthNames.includes(month)) {
      monthlyTicketMap[month] += tx.quantity ?? 0;
    }
  });

  // Siapkan data final untuk chart
  const chartData = monthNames.map((month) => ({
    month,
    tickets: monthlyTicketMap[month],
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview Ticket</CardTitle>
        <CardDescription>Tickets Sold by Month</CardDescription>
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
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="tickets" fill="#10b981" radius={8} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Showing total tickets
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          sold for the last 4 months
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChartDashboardTickets;
