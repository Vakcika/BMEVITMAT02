import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProductCardGrid } from "./ProductCardGrid";
import useGetProductsPaginated from "../../hooks/useGetProductsPaginated";
import useDeleteProduct from "../../hooks/useDeleteProduct";
interface WrapperProps {
  title?: string;
  defaultRows?: number;
  baseUrl?: string;
  queryParams?: string;
}

export default function ProductList({
  title = "Products",
  defaultRows = 24,
  baseUrl = "/api/products",
  queryParams = "",
}: Readonly<WrapperProps>) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(defaultRows);
  const [searchParams] = useSearchParams();
  const queryString = searchParams.toString();

  const { products, meta, isLoading, isFetching, refetch } =
    useGetProductsPaginated(rows, page, queryParams, queryString, baseUrl);
  const { deleteProduct } = useDeleteProduct(baseUrl, { refetch });

  const handleView = (product: Product) => {
    navigate(`/app/product/${product.id}`);
  };

  const handleCreate = () => {
    navigate("/app/product/new");
  };

  const handleDelete = async (product: Product) => {
    try {
      await deleteProduct(product.id);
      toast.success("Product deleted successfully");
      await refetch();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          error?.message ??
          "Failed to delete product"
      );
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mt-6 mb-4">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <Button className="bg-p300 text-n0" onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Add new product
        </Button>
      </div>
      <div className="bg-white rounded-lg shadow">
        <ProductCardGrid
          value={products}
          loading={isLoading || isFetching}
          title={title}
          onView={handleView}
          onDelete={handleDelete}
          paginationProps={{
            totalRecords: meta?.total ?? 0,
            rows,
            page,
            setRows,
            setPage,
          }}
        />
      </div>
    </div>
  );
}
