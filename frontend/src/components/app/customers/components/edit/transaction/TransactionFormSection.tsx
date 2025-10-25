import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FormikErrors, FormikTouched } from "formik";
import { ChangeEvent, FocusEvent } from "react";
import { FormSelect } from "@/components/common/form/FormSelect";
import { FormInput } from "@/components/common/form/FormInput";
import { TransactionFormValues } from "@/types/Transaction";

interface TransactionFormSectionProps {
  values: TransactionFormValues;
  errors: FormikErrors<TransactionFormValues>;
  touched: FormikTouched<TransactionFormValues>;
  handleChange: (e: ChangeEvent<any>) => void;
  handleBlur: (e: FocusEvent<any>) => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  customers: Customer[];
}

export default function TransactionFormSection({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setFieldValue,
  customers,
}: Readonly<TransactionFormSectionProps>) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="space-y-4">
          {/* Customer Section */}
          <h3 className="text-lg font-medium">Basic Information</h3>
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
        </div>
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

        {/* Notes Section */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="note">Notes</Label>
          <Textarea
            id="notes"
            name="note"
            placeholder="Additional notes about this transaction"
            value={values.note ?? ""}
            onChange={handleChange}
            onBlur={handleBlur}
            rows={4}
          />
          {touched.note && errors.note && (
            <p className="text-sm text-w300 mt-1">{errors.note}</p>
          )}
        </div>
      </div>
    </div>
  );
}
