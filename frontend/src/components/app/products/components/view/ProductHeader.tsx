import { Button } from "@/components/ui/button";
import { Edit, Package, Scale, Layers } from "lucide-react";
import { DeleteActionButton } from "@/components/tables/actions/DeleteActionButton";
import LazyImage from "@/components/common/LazyImg";

export default function ViewProductHeader({
  product,
  onEdit,
  onDelete,
}: Readonly<{
  product: Product;
  onEdit: () => void;
  onDelete: (product: Product) => void;
}>) {
  return (
    <div className="mt-6 mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
      <div className="flex items-center gap-4">
        {product.image_url ? (
          <LazyImage
            src={product.image_url}
            alt={product.name}
            className="w-16 h-16 rounded-lg object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-lg flex items-center justify-center">
            <Package className="w-20 h-20 text-p100" />
          </div>
        )}
        <div>
          <h1 className="text-2xl font-semibold">
            {"#" + product.id + " " + product.name}
          </h1>
          <div className="flex items-center gap-3 mt-1 text-sm text-n100">
            <span className="flex items-center gap-1">
              <Scale className="w-4 h-4" />
              {product.weight}g
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Layers className="w-4 h-4" />
              {product.category.name}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button onClick={onEdit}>
          <Edit className="w-6 h-6 mr-2" />
          Edit
        </Button>
        <DeleteActionButton
          item={product}
          itemName="product"
          itemLabel={"#" + product.id + " " + product.name}
          onDelete={() => onDelete(product)}
          variant="lg"
        />
      </div>
    </div>
  );
}
