import { FormInput } from "@/components/common/form/FormInput";
import { FormikProps } from "formik";

interface CompanyInformationProps {
  formik: FormikProps<Customer>;
}

export default function CompanyInformation({
  formik,
}: Readonly<CompanyInformationProps>) {
  const { values, errors, touched, handleChange, handleBlur } = formik;

  return (
    <div className="space-y-4 md:col-span-2">
      <h3 className="text-lg font-medium">Company Information</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <FormInput
          id="company_name"
          name="company_name"
          label="Company Name*"
          placeholder="Company name"
          value={values.company_name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            touched.company_name && errors.company_name
              ? errors.company_name
              : undefined
          }
        />

        <FormInput
          id="website"
          name="website"
          label="Website"
          placeholder="https://example.com"
          value={values.website ?? ""}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.website && errors.website ? errors.website : undefined}
        />

        <FormInput
          id="tax_number"
          name="tax_number"
          label="Tax Number"
          placeholder="Tax ID/Number"
          value={values.tax_number ?? ""}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            touched.tax_number && errors.tax_number
              ? errors.tax_number
              : undefined
          }
        />
      </div>
    </div>
  );
}
