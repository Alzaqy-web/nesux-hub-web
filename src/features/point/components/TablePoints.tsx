import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TablePoints = () => {
  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>Point</TableHead>
          <TableHead>Created Date</TableHead>
          <TableHead>Expire Date</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="border">
        <TableRow>
          <TableCell>1</TableCell>
          <TableCell>10.000</TableCell>
          <TableCell>22 Juli 2025</TableCell>
          <TableCell>22 Oktober 2025</TableCell>
        </TableRow>
      </TableBody>

      <TableBody className="border">
        <TableRow>
          <TableCell>2</TableCell>
          <TableCell>10.000</TableCell>
          <TableCell>22 Juli 2025</TableCell>
          <TableCell>22 Oktober 2025</TableCell>
        </TableRow>
      </TableBody>

      <TableBody className="border">
        <TableRow>
          <TableCell>3</TableCell>
          <TableCell>10.000</TableCell>
          <TableCell>22 Juli 2025</TableCell>
          <TableCell>22 Oktober 2025</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default TablePoints;
