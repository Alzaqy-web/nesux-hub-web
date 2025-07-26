"use client";

import { useParams } from "next/navigation";
import FormEditEvent from "@/features/dashboard/events/edit-event/components/FormEditEvent";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";

const EditEventPage = () => {
  const params = useParams();
  const slug = params.slug as string;

  if (!slug) return <div>Event not found</div>;

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
        <SiteHeader title="Edit Event" />
        <div className="p-6">
          <Card className="@container/card">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                Edit My Event
              </CardTitle>
            </CardHeader>

            <FormEditEvent slug={slug} />
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default EditEventPage;
