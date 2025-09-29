import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CustomPaginationProps } from "@/components/tables/PaginationControls";
import { ProductCardSkeleton } from "./ProductCardSkeleton";

interface ProductCardGridSkeletonProps {
  title: string;
  paginationProps?: CustomPaginationProps;
}

export const ProductCardGridSkeleton = ({
  title,
  paginationProps,
}: ProductCardGridSkeletonProps) => {
  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-none">
        <CardHeader className="flex flex-row items-center justify-between pb-6">
          <CardTitle>{title}</CardTitle>
          {paginationProps && (
            <Select disabled value={paginationProps.rows.toString()}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
            </Select>
          )}
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: paginationProps?.rows ?? 12 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
