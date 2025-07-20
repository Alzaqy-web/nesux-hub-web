// src/app/dashboard/page.tsx
import DashboardFeature from "@/features/dashboard"

export default function DashboardPage() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Organizer Dashboard</h1>
      <DashboardFeature />
    </main>
  )
}
