import {
  Package,
  Scale,
  Layers,
  Ruler,
  Hash,
  CalendarClock,
  CalendarArrowUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DetailWithIcon from "@/components/common/details/DetailWithIcon";

export default function ProductDetailsCard({
  product,
}: Readonly<{
  product: Product;
}>) {
  return (
    <Card className="bg-n0 rounded-lg shadow lg:col-span-2">
      <CardHeader>
        <CardTitle>Product Specifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DetailWithIcon
            icon={<Hash className="w-6 h-6 text-n100" />}
            label="Product ID"
            value={`#${product.id.toString().padStart(6, "0")}`}
          />
          {product.name && (
            <DetailWithIcon
              icon={<Package className="w-6 h-6 text-cyan-500" />}
              label="Product Name"
              value={product.name}
            />
          )}

          <DetailWithIcon
            icon={<Ruler className="w-6 h-6 text-green-500" />}
            label="Size"
            value={product.size}
          />
          <DetailWithIcon
            icon={<Scale className="w-6 h-6 text-orange-500" />}
            label="Weight"
            value={`${product.weight} g`}
          />
          <DetailWithIcon
            icon={<Layers className="w-6 h-6 text-p300" />}
            label="Category"
            value={
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-p50 text-p500">
                {product.category}
              </span>
            }
          />
          <DetailWithIcon
            icon={<CalendarClock className="w-6 h-6 text-n100" />}
            label="Created At"
            value={new Date(product.created_at).toLocaleString()}
          />
          <DetailWithIcon
            icon={<CalendarArrowUp className="w-6 h-6 text-n100" />}
            label="Updated At"
            value={new Date(product.updated_at).toLocaleString()}
          />
        </div>
      </CardContent>
    </Card>
  );
}
