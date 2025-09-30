import { FormikProps } from "formik";
import { FormSelect } from "@/components/common/form/FormSelect";
import useGetProductCategories from "../../hooks/useGetCategories";

interface Props {
  formik: FormikProps<ProductFormValues>;
}

export default function CategorySelect({ formik }: Readonly<Props>) {
  const { values, errors, touched, setFieldValue } = formik;
  const { categories, isLoading } = useGetProductCategories();

  return (
    <FormSelect<ProductCategory>
      name="category_id"
      label="Category*"
      value={values.category_id?.toString() ?? ""}
      onChange={(val) => setFieldValue("category_id", Number(val))}
      options={categories}
      getOptionValue={(c) => c.id.toString()}
      getOptionLabel={(c) => c.name}
      placeholder={isLoading ? "Loading categories..." : "Select category"}
      emptyLabel="None"
      error={
        touched.category_id && errors.category_id
          ? errors.category_id
          : undefined
      }
    />
  );
}
