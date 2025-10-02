import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import useGetProductCategorysPaginated from "../hooks/useGetProductCategoriesPaginated";
import useDeleteProductCategory from "../hooks/useDeleteProductCategory";
import { ProductCategoryTable } from "./ProductCategoryTable";

export default function ProductCategoryList({
  title = "Product categories",
  defaultRows = 5,
  baseUrl = "/api/product-categories",
  queryParams = "",
}: Readonly<WrapperProps>) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(defaultRows);
  const [searchParams] = useSearchParams();
  const queryString = searchParams.toString();

  const { data, meta, isLoading, isFetching, refetch } =
    useGetProductCategorysPaginated(
      rows,
      page,
      queryParams,
      queryString,
      baseUrl
    );

  const { deleteProductCategory } = useDeleteProductCategory(baseUrl, {
    refetch,
  });

  const handleView = (data: ProductCategory) => {
    navigate(`/app/settings/product-categories/${data.id}`);
  };

  const handleCreate = () => {
    navigate("/app/settings/product-categories/new");
  };

  const handleDelete = async (data: ProductCategory) => {
    await deleteProductCategory(data.id);
    await refetch();
  };

  return (
    <div>
      <div className="flex justify-between items-center mt-6 mb-4">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <Button className="bg-p300 text-n0" onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" /> Add new
        </Button>
      </div>
      <div className="bg-white rounded-lg shadow">
        <ProductCategoryTable
          value={data}
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
