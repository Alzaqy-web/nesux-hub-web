import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import TableEvents from "./components/TableEvents";

const DashboardEventsPage = () => {
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
        <SiteHeader title="All Events" />
        <div className="p-6">
          <Card className="@container/card">
            <CardHeader>
              {/* <CardDescription>My Events</CardDescription> */}
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                My Events
              </CardTitle>
              <TableEvents />
            </CardHeader>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardEventsPage;
