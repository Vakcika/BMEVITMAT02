import { FormikProps } from "formik";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  formik: FormikProps<ProductFormValues>;
}

export default function Notes({ formik }: Readonly<Props>) {
  const { values, errors, touched, handleChange, handleBlur } = formik;

  return (
    <div className="md:col-span-2">
      <Label htmlFor="notes">Notes</Label>
      <Textarea
        id="notes"
        name="notes"
        placeholder="Enter notes"
        value={values.notes ?? ""}
        onChange={handleChange}
        onBlur={handleBlur}
        rows={3}
      />
      {touched.notes && errors.notes && (
        <p className="text-sm text-red-500 mt-1">{errors.notes}</p>
      )}
    </div>
  );
}
