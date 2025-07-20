// src/features/dashboard/index.tsx
import StatsCard from "./components/StatsCard"
import TransactionTable from "./components/TranscationTable"
import AttendeeList from "./components/AttendeeList"

export default function DashboardFeature() {
  return (
    <div className="grid gap-6">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard title="Total Events" value="12" />
        <StatsCard title="Total Revenue" value="Rp 12.000.000" />
        <StatsCard title="Pending Transactions" value="5" />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Recent Transactions</h2>
        <TransactionTable />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Attendee List</h2>
        <AttendeeList />
      </section>
    </div>
  )
}
