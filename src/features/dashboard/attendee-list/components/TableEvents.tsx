import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

const TableEvents = () => {
  return (
    <Table className="mt-5 border">
      <TableHeader>
        <TableRow className="items-center">
          <TableHead>Event</TableHead>
          <TableHead>User</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Total Price</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow>
          <TableCell>
            <Image
              src="/building.jpeg"
              alt="Building"
              width={500}
              height={500}
              className="h-30 w-full rounded-xl object-cover"
            />
          </TableCell>
          <TableCell>Playoff MLBB Indonesia</TableCell>

          <TableCell>
            <Button className="bg-orange-400 text-white">Show List</Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default TableEvents;
