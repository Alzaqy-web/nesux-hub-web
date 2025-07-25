"use client";

import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import useGetAdminEvents from "../events/api/useGetAdminEvents";
import useGetAdminTransactions from "../transactions/api/useGetAdminTransactions";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from "next-auth/react";

export function SectionCards() {
  const { data: session } = useSession();
  const accessToken = session?.user?.accessToken;

  const { data, isPending } = useGetAdminEvents(accessToken);
  const totalEvent = data?.data?.length || 0;

  const { data: transactionData, isPending: isPendingTransactions } =
    useGetAdminTransactions(accessToken);
  const totalRevenue =
    transactionData?.data?.reduce(
      (acc, curr) => acc + (curr.totalPrice ?? 0),
      0,
    ) || 0;
  const formattedRevenue = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(totalRevenue);

  const totalTickets =
    transactionData?.data?.reduce(
      (acc, curr) => acc + (curr.quantity ?? 0),
      0,
    ) || 0;

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-2xl">
            {isPendingTransactions ? "Loading..." : formattedRevenue}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Event</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {isPending ? "Loading..." : totalEvent}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingDown />
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Tickets</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {isPendingTransactions ? "Loading..." : `+${totalTickets}`}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>
    </div>
  );
}
