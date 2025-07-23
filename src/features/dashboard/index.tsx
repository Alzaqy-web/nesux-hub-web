import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ChartDashboard from "./components/chart-bar";
import { SectionCards } from "./components/sectionCards";

const DashboardPage = () => {
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
        <SiteHeader title="Dashboard" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="grid grid-cols-4 gap-4 px-6 py-4 md:gap-5 md:py-6">
              <div className="col-span-4 md:col-span-4">
                <SectionCards />
              </div>
              <div className="col-span-4 md:col-span-2">
                <ChartDashboard />
              </div>
              <div className="col-span-4 md:col-span-2">
                <ChartDashboard />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardPage;
