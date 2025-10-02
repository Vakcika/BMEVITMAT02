import { FormikProps } from "formik";
import useGetGems from "../../hooks/useGetGems";
import { Button } from "@/components/ui/button";
import { FormSelect } from "@/components/common/form/FormSelect";
import { FormInput } from "@/components/common/form/FormInput";

interface Props {
  formik: FormikProps<ProductFormValues>;
}

export default function GemSelector({ formik }: Readonly<Props>) {
  const { values, setFieldValue } = formik;
  const { gems, isLoading } = useGetGems();

  const addGem = () => {
    setFieldValue("gems", [...values.gems, { id: 0, count: 1 }]);
  };

  const updateGem = (index: number, field: string, value: any) => {
    const newGems = [...values.gems];
    (newGems[index] as any)[field] = value;
    setFieldValue("gems", newGems);
  };

  const removeGem = (index: number) => {
    const newGems = [...values.gems];
    newGems.splice(index, 1);
    setFieldValue("gems", newGems);
  };

  return (
    <div className="md:col-span-2 space-y-4">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium">Gems</label>
        <Button type="button" onClick={addGem} size="sm">
          + Add Gem
        </Button>
      </div>

      {values.gems.length === 0 && (
        <p className="text-sm text-gray-500">No gems added yet.</p>
      )}

      {values.gems.map((gem, index) => (
        <div
          key={index}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end border rounded-md p-3"
        >
          <FormSelect
            name={`gems[${index}].id`}
            label="Gem"
            value={gem.id.toString()}
            onChange={(val) => updateGem(index, "id", Number(val))}
            options={gems}
            getOptionValue={(g) => g.id.toString()}
            getOptionLabel={(g) => `${g.color} ${g.shape} (${g.size})`}
            placeholder={isLoading ? "Loading..." : "Select gem"}
            emptyLabel="None"
          />

          <FormInput
            name={`gems[${index}].count`}
            label="Count"
            type="number"
            value={gem.count}
            onChange={(e) => updateGem(index, "count", Number(e.target.value))}
            id={"gems"}
            onBlur={function (): void {
              throw new Error("Function not implemented.");
            }}
          />

          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => removeGem(index)}
          >
            Remove
          </Button>
        </div>
      ))}
    </div>
  );
}
