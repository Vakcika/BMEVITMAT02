import { useSearchParams } from "react-router-dom";
import FilterSelect from "@/components/tables/FilterSelect";
import useGetTransactionYears from "../../../hooks/transaction/useGetTransactionYears";

export default function TransactionFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { years, isLoading } = useGetTransactionYears();

  return (
    <>
      <FilterSelect
        label="year"
        paramKey="year"
        options={years.map((t) => ({
          value: t.toString(),
          label: t.toString(),
        }))}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        disabled={isLoading}
      />
    </>
  );
}
