import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TableProps {
  gems: ProductGem[];
  title: string;
}
export const ProductGemsTable = ({ gems, title }: TableProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("hu-HU", {
      style: "currency",
      currency: "HUF",
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Size</TableHead>
              <TableHead>Count</TableHead>
              <TableHead>Color</TableHead>
              <TableHead>Shape</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Booking Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {gems?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center text-muted-foreground"
                >
                  No product gems found
                </TableCell>
              </TableRow>
            ) : (
              gems?.map((data) => (
                <TableRow key={data.id}>
                  <TableCell className="font-medium">{data.gem.size}</TableCell>
                  <TableCell>{data.count}</TableCell>
                  <TableCell>{data.gem.color.name}</TableCell>
                  <TableCell>{data.gem.shape.name}</TableCell>
                  <TableCell>{formatCurrency(data.gem.price)}</TableCell>
                  <TableCell>
                    {formatCurrency(data.gem.booking_price)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
