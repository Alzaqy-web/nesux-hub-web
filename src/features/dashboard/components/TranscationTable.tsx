// src/features/dashboard/components/TransactionTable.tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const dummyTransactions = [
  { id: "TXN-001", name: "Zahra", event: "Tech Expo", amount: "Rp 100.000", status: "Accepted" },
  { id: "TXN-002", name: "Faiz", event: "Game Con", amount: "Rp 200.000", status: "Pending" },
  { id: "TXN-003", name: "Budi", event: "Startup Day", amount: "Rp 300.000", status: "Rejected" },
]

const statusColor = {
  Accepted: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Rejected: "bg-red-100 text-red-700",
}

const TransactionTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Transaction ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Event</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dummyTransactions.map((txn) => (
          <TableRow key={txn.id}>
            <TableCell>{txn.id}</TableCell>
            <TableCell>{txn.name}</TableCell>
            <TableCell>{txn.event}</TableCell>
            <TableCell>{txn.amount}</TableCell>
            <TableCell>
              <Badge className={statusColor[txn.status as keyof typeof statusColor]}>
                {txn.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TransactionTable
