import { Package } from "lucide-react";
import LazyImage from "@/components/common/LazyImg";
import { DeleteActionButton } from "./actions/DeleteActionButton";
import { ViewActionButton } from "./actions/ViewActionButton";

interface ProductCardProps {
  product: Product;
  onView: (product: Product) => void;
  onDelete?: (product: Product) => void;
}

export const ProductCard = ({
  product,
  onView,
  onDelete,
}: ProductCardProps) => {
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="relative h-80 bg-gradient-to-br from-gray-50 to-gray-100/50 overflow-hidden">
        {product.image_url ? (
          <LazyImage
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-20 h-20 text-p100" />
          </div>
        )}

        <div className="absolute top-4 left-4">
          <span className="inline-block bg-white/95 backdrop-blur-sm text-gray-900 px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg">
            {product.category}
          </span>
        </div>

        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <ViewActionButton
            item={product}
            onView={onView}
            variant="lg"
            className="bg-white hover:bg-p50 text-gray-900 rounded-full shadow-lg"
          />
          {onDelete && (
            <DeleteActionButton
              item={product}
              itemLabel={"#" + product.id + " " + product.name}
              onDelete={onDelete}
              variant="lg"
              className="rounded-full shadow-lg bg-destructive hover:bg-destructive/90"
            />
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="font-bold text-xl mb-1 text-gray-900 truncate">
            {product.name}
          </h3>
          <p className="text-sm text-gray-400">ID: {product.id}</p>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-gray-500 font-medium">Size</span>
            <span className="text-sm font-semibold text-gray-900">
              {product.size}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-gray-500 font-medium">Weight</span>
            <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {product.weight}g
            </span>
          </div>
        </div>

        {product.notes && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
              {product.notes}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
