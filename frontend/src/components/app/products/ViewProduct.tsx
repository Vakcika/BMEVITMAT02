import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useHttpGet from "@/api/useHttpGet";
import useHttpDelete from "@/api/useHttpDelete";
import LoadingCircle from "@/components/common/LoadingCircle";
import CustomBreadCrumb from "@/components/common/CustomBreadcrumb";
import ProductHeader from "./components/view/ProductHeader";
import ProductDetailsCard from "./components/view/ProductDetailsCard";
import ProductNotesCard from "./components/view/ProductNotesCard";
import ProductImageCard from "./components/view/ProductImageCard";
import { ProductGemsTable } from "./components/view/ProductGemsTable";

export default function ViewProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);

  const query = useHttpGet<{ data: Product }>(`/api/products/${id}`);
  const deleteMutation = useHttpDelete("/api/products", query);

  useEffect(() => {
    if (query.data) {
      setProduct(query.data.data);
    }
  }, [query.data]);

  if (query.error) {
    toast.error(query.error.message || "Failed to load product.");
    console.error(query.error);
  }

  const handleEdit = () => navigate(`/app/products/${id}/edit`);

  const handleDelete = async (product: Product) => {
    try {
      await deleteMutation.mutateAsync(product.id);
      toast.success("Product deleted successfully");
      navigate(`/app/products`);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          error?.message ??
          "Failed to delete product"
      );
      console.error(error);
    }
  };

  const breadcrumbs = [
    { label: "Products", url: "/app/products" },
    { label: product?.id.toString() ?? "Product", url: "" },
  ];

  if (query.isLoading) return <LoadingCircle />;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="p-4">
      <CustomBreadCrumb model={breadcrumbs} />
      <ProductHeader
        product={product}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 my-6">
        {product.name && (
          <div className="lg:col-span-1">
            <ProductImageCard product={product} />
          </div>
        )}
        <div className="lg:col-span-2 space-y-6">
          <ProductDetailsCard product={product} />
          <ProductNotesCard product={product} />
        </div>
      </div>
      <ProductGemsTable gems={product.gems} title="Product gems" />
    </div>
  );
}
