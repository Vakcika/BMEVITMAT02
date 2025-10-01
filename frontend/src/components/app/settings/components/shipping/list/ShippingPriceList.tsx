import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import useGetShippingPricesPaginated from "../hooks/useGetShippingPricePaginated";
import useDeleteShippingPrice from "../hooks/useDeleteShippingPrice";
import { ShippingPriceTable } from "./ShippingPriceTable";

export default function ShippingPriceList({
  title = "Shipping Prices",
  defaultRows = 5,
  baseUrl = "/api/shipping-prices",
  queryParams = "",
}: Readonly<WrapperProps>) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(defaultRows);
  const [searchParams] = useSearchParams();
  const queryString = searchParams.toString();

  const { data, meta, isLoading, isFetching, refetch } =
    useGetShippingPricesPaginated(
      rows,
      page,
      queryParams,
      queryString,
      baseUrl
    );

  const { deleteShippingPrice } = useDeleteShippingPrice(baseUrl, { refetch });

  const handleView = (data: ShippingPrice) => {
    navigate(`/app/settings/shipping/${data.id}`);
  };

  const handleCreate = () => {
    navigate("/app/settings/shipping/new");
  };

  const handleDelete = async (data: ShippingPrice) => {
    await deleteShippingPrice(data.id);
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
        <ShippingPriceTable
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
