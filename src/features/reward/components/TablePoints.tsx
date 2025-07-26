import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetPoint from "../api/useGetPoint";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { PointHistory } from "@/types/pointHistory";

interface TablePointProps {
  points: PointHistory[];
}

const TablePoints = ({ points }: TablePointProps) => {
  const { data, isLoading } = useGetPoint();

  if (isLoading) return <p>Loading...</p>;

  if (points.length === 0) {
    return <p className="text-sm text-blue-300">Belum ada history point.</p>;
  }

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
        {data.data.map((point: PointHistory, index: number) => (
          <TableRow key={point.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{point.amount.toLocaleString("id-ID")}</TableCell>
            <TableCell>
              {" "}
              {format(new Date(point.createdAt), "dd MMMM yyyy", {
                locale: id,
              })}
            </TableCell>
            <TableCell>
              {format(new Date(point.expiresAt), "dd MMMM yyyy", {
                locale: id,
              })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TablePoints;
