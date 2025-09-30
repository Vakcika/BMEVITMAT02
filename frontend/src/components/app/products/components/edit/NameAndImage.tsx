import { FormInput } from "@/components/common/form/FormInput";
import { FormikProps } from "formik";

interface Props {
  formik: FormikProps<ProductFormValues>;
}

export default function NameAndImage({ formik }: Readonly<Props>) {
  const { values, errors, touched, handleChange, handleBlur } = formik;
  return (
    <>
      <FormInput
        name="name"
        label="Name*"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.name && errors.name ? errors.name : undefined}
        id={"name"}
      />

      <FormInput
        name="image_url"
        label="Image URL"
        value={values.image_url ?? ""}
        onChange={handleChange}
        onBlur={handleBlur}
        error={
          touched.image_url && errors.image_url ? errors.image_url : undefined
        }
        id={"image_url"}
      />
    </>
  );
}
