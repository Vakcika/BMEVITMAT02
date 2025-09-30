import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Maximize2, X, Package } from "lucide-react";
import LazyImage from "@/components/common/LazyImg";

interface ProductImageCardProps {
  product: Product;
}

export default function ProductImageCard({
  product,
}: Readonly<ProductImageCardProps>) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <Card className="bg-n0 rounded-2xl shadow-sm overflow-hidden flex flex-col h-full">
        <CardHeader className="pb-2">
          <CardTitle>Product Image</CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex">
          <div className="relative w-full flex-1 rounded-lg overflow-hidden">
            {product.image_url ? (
              <LazyImage
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover cursor-pointer transition-transform hover:scale-[1.02]"
                onClick={() => setIsExpanded(true)}
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full min-h-[200px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
                <Package className="w-12 h-12 text-p200" />
              </div>
            )}

            {product.image_url && (
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                onClick={() => setIsExpanded(true)}
              >
                <Maximize2 className="w-4 h-4 text-n400" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Fullscreen Overlay */}
      {isExpanded && product.image_url && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsExpanded(false)}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20"
            onClick={() => setIsExpanded(false)}
          >
            <X className="w-6 h-6" />
          </Button>
          <LazyImage
            src={product.image_url}
            alt={product.name}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
