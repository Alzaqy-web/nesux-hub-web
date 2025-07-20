// src/features/dashboard/components/AttendeeList.tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const dummyAttendees = [
  { name: "Andi", event: "Tech Expo", tickets: 2, totalPaid: "Rp 200.000" },
  { name: "Siti", event: "Game Con", tickets: 1, totalPaid: "Rp 100.000" },
  { name: "Rian", event: "Startup Day", tickets: 3, totalPaid: "Rp 300.000" },
]

const AttendeeList = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Event</TableHead>
          <TableHead>Tickets</TableHead>
          <TableHead>Total Paid</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dummyAttendees.map((a, i) => (
          <TableRow key={i}>
            <TableCell>{a.name}</TableCell>
            <TableCell>{a.event}</TableCell>
            <TableCell>{a.tickets}</TableCell>
            <TableCell>{a.totalPaid}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default AttendeeList
