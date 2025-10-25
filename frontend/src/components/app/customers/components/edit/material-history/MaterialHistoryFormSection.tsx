import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FormikErrors, FormikTouched } from "formik";
import { ChangeEvent, FocusEvent, useState } from "react";
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
  const [withLoss, setWithLoss] = useState(false);
  const [lossPercentage, setLossPercentage] = useState<number | "">("");
  const [originalAmount, setOriginalAmount] = useState<number | null>(null);

  const handleLossToggle = (value: string) => {
    const enabled = value === "yes";
    setWithLoss(enabled);

    if (enabled) {
      // Store the original amount when enabling loss
      if (originalAmount === null) {
        setOriginalAmount(Number(values.amount) || 0);
      }
    } else {
      // Restore the original amount when disabling loss
      if (originalAmount !== null) {
        setFieldValue("amount", originalAmount);
      }
      setOriginalAmount(null);
      setLossPercentage("");
      setFieldValue("notes", values.notes ?? "");
    }
  };

  const handleLossChange = (e: ChangeEvent<HTMLInputElement>) => {
    const percent = parseFloat(e.target.value);
    setLossPercentage(isNaN(percent) ? "" : percent);

    // Use the stored originalAmount for calculation
    const baseAmount = originalAmount ?? Number(values.amount);

    if (!isNaN(percent) && baseAmount > 0) {
      const adjustedAmount =
        Math.round(baseAmount * (1 - percent / 100) * 100) / 100;
      setFieldValue("amount", adjustedAmount);

      const noteText = `Original amount: ${baseAmount} (${percent}% loss applied)`;
      setFieldValue("notes", noteText);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Financial Section */}
        <div className="space-y-4">
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

        {/* Basic Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Basic Information</h3>

          <div className="flex flex-wrap gap-4 text-nowrap">
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

            {/* Hidden Menu for Loss */}
            <FormSelect
              label="Apply Loss"
              name="with_loss"
              value={withLoss ? "yes" : "no"}
              onChange={(value) => handleLossToggle(value)}
              options={[
                { id: "no", name: "No" },
                { id: "yes", name: "With Loss" },
              ]}
              getOptionValue={(o) => o.id}
              getOptionLabel={(o) => o.name}
              placeholder="Select option"
            />

            {withLoss && (
              <FormInput
                id="loss_percentage"
                name="loss_percentage"
                label="Loss Percentage"
                type="number"
                step="1"
                min="0"
                max="100"
                placeholder="e.g. 5"
                value={lossPercentage}
                onChange={handleLossChange}
                onBlur={handleBlur}
              />
            )}
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
