import { FormInput } from "@/components/common/form/FormInput";
import { FormikProps } from "formik";

interface Props {
  formik: FormikProps<ProductFormValues>;
}

export default function SizeAndWeight({ formik }: Readonly<Props>) {
  const { values, errors, touched, handleChange, handleBlur } = formik;

  return (
    <>
      <FormInput
        name="size"
        label="Size*"
        value={values.size}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.size && errors.size ? errors.size : undefined}
        id={"weight"}
      />

      <FormInput
        name="weight"
        label="Weight*"
        type="number"
        value={values.weight}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.weight && errors.weight ? errors.weight : undefined}
        id={"weight"}
      />
    </>
  );
}
