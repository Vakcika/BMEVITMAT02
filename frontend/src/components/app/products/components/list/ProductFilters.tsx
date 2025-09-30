import { useSearchParams } from "react-router-dom";
import FilterSelect from "@/components/tables/FilterSelect";
import useGetProductCategories from "../../hooks/useGetCategories";

export default function ProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories, isLoading } = useGetProductCategories();

  return (
    <FilterSelect
      label="category"
      paramKey="category"
      options={categories.map((c) => ({ value: c.name, label: c.name }))}
      searchParams={searchParams}
      setSearchParams={setSearchParams}
      disabled={isLoading}
    />
  );
}
