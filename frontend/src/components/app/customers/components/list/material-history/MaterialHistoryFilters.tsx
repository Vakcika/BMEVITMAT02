import { useSearchParams } from "react-router-dom";
import FilterSelect from "@/components/tables/FilterSelect";
import useGetMaterialHistoryYears from "../../../hooks/material-history/useGetMaterialHistoryYears";

export default function MaterialHistoryFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { years, isLoading } = useGetMaterialHistoryYears();

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
