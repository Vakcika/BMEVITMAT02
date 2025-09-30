import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Detail from "@/components/common/details/Detail";
import { FileText } from "lucide-react";

export default function ProductNotesCard({
  product,
}: Readonly<{
  product: Product;
}>) {
  return (
    <Card className="bg-n0 rounded-lg shadow lg:col-span-2 xl:col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Product Notes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="min-h-[100px]">
          <Detail
            label="Additional Information"
            value={product.notes ?? "No additional notes provided."}
          />
        </div>
      </CardContent>
    </Card>
  );
}
