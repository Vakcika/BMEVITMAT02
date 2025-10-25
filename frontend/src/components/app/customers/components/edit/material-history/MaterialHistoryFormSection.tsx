import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FormikErrors, FormikTouched } from "formik";
import { ChangeEvent, FocusEvent } from "react";
import { FormSelect } from "@/components/common/form/FormSelect";
import { FormInput } from "@/components/common/form/FormInput";
import { Material, MaterialHistoryFormValues } from "@/types/Material";

interface MaterialHistoryFormSectionProps {
  values: MaterialHistoryFormValues;
  errors: FormikErrors<MaterialHistoryFormValues>;
  touched: FormikTouched<MaterialHistoryFormValues>;
  handleChange: (e: ChangeEvent<any>) => void;
  handleBlur: (e: FocusEvent<any>) => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  customers: Customer[];
  materials: Material[];
}

export default function MaterialHistoryFormSection({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setFieldValue,
  customers,
  materials,
}: Readonly<MaterialHistoryFormSectionProps>) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-4">
          {/* Amount Section */}
          <h3 className="text-lg font-medium">Financial Details</h3>
          <FormInput
            id="amount"
            name="amount"
            label="Amount*"
            type="number"
            step="100"
            placeholder="0"
            value={values.amount}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.amount && (errors.amount as string)}
          />
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Basic Information</h3>
          <div className="flex justify-start items-center gap-4">
            <FormSelect
              label="Customer*"
              name="customer_id"
              value={values.customer_id.toString()}
              onChange={(value) => setFieldValue("customer_id", Number(value))}
              options={customers}
              getOptionValue={(c) => c.id.toString()}
              getOptionLabel={(c) => c.company_name}
              placeholder="Select customer"
              emptyLabel="None"
              error={touched.customer_id && (errors.customer_id as string)}
            />
            <FormSelect
              label="Material*"
              name="material_id"
              value={values.material_id.toString()}
              onChange={(value) => setFieldValue("material_id", Number(value))}
              options={materials}
              getOptionValue={(m) => m.id.toString()}
              getOptionLabel={(m) => `${m.name} | ${m.type}`}
              placeholder="Select material"
              emptyLabel="None"
              error={touched.material_id && (errors.material_id as string)}
            />
          </div>
        </div>

        {/* Notes Section */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            name="notes"
            placeholder="Additional notes about this history"
            value={values.notes ?? ""}
            onChange={handleChange}
            onBlur={handleBlur}
            rows={4}
          />
          {touched.notes && errors.notes && (
            <p className="text-sm text-w300 mt-1">{errors.notes}</p>
          )}
        </div>
      </div>
    </div>
  );
}
