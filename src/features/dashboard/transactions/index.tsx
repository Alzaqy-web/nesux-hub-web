import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import TableTransactions from "./components/TableTransactions";

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
          <TableTransactions />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardTransactionPage;
