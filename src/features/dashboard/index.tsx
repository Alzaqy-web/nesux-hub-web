import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ChartDashboardRevenue from "./components/chart-bar-revenue";
import ChartDashboardTickets from "./components/chart-bar-ticket";
import { SectionCards } from "./components/sectionCards";

const DashboardPage = () => {
  return (
    <div className="flex flex-col">
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
          <SiteHeader title="Dashboard" />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="grid grid-cols-4 gap-4 px-6 py-4 md:gap-5 md:py-6">
                <div className="col-span-4 md:col-span-4">
                  <SectionCards />
                </div>
                <div className="col-span-4 md:col-span-2">
                  <ChartDashboardRevenue />
                </div>
                <div className="col-span-4 md:col-span-2">
                  <ChartDashboardTickets />
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default DashboardPage;
