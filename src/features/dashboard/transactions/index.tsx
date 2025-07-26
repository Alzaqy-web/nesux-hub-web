import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import TableTransactions from "./components/TableTransactions";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardTransactionPage = () => {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title="Transactions" />
        <div className="p-6">
          <Card className="@container/card">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                My Transaction
              </CardTitle>
            </CardHeader>
            <TableTransactions />
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardTransactionPage;
