import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Formik, Form, FormikHelpers } from "formik";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import CustomBreadCrumb from "@/components/common/CustomBreadcrumb";
import LoadingCircle from "@/components/common/LoadingCircle";
import FormActions from "@/components/common/form/FormAction.tsx";
import useGetCustomers from "../../../hooks/customer/useGetCustomers";
import MaterialHistoryFormSection from "./MaterialHistoryFormSection";
import { MaterialHistory, MaterialHistoryFormValues } from "@/types/Material";
import useCreateMaterialHistory from "../../../hooks/material-history/useCreateMaterialHistory";
import useGetMaterialHistory from "../../../hooks/material-history/useGetMaterialHistory";
import useUpdateMaterialHistory from "../../../hooks/material-history/useUpdateMaterialHistory";
import { UUID } from "crypto";
import { MaterialHistorySchema } from "@/components/app/validationSchemas";
import useGetMaterials from "@/components/app/settings/components/material/hooks/useGetMaterials";

interface EditMaterialHistoryProps {
  isNew?: boolean;
}

export function mapMaterialHistoryToFormValues(
  tx: MaterialHistory
): MaterialHistoryFormValues {
  return {
    id: tx.id,
    customer_id: tx.customer.id,
    amount: tx.amount,
    notes: tx.notes,
    material_id: tx.material.id,
    order_id: "" as UUID,
  };
}

export default function EditMaterialHistory({
  isNew = false,
}: Readonly<EditMaterialHistoryProps>) {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const customerId = Number(searchParams.get("customer")) || null;
  const navigate = useNavigate();

  const { customers } = useGetCustomers();
  const { materials } = useGetMaterials();
  const { materialHistoryData, isLoading: materialHistoryLoading } =
    useGetMaterialHistory(isNew);
  const { createMaterialHistory } = useCreateMaterialHistory();
  const { updateMaterialHistory } = useUpdateMaterialHistory();

  const handleSubmit = async (
    values: MaterialHistoryFormValues,
    { setSubmitting }: FormikHelpers<MaterialHistoryFormValues>
  ) => {
    try {
      if (isNew) {
        const result = await createMaterialHistory(values);
        if (result?.data?.id) {
          navigate(`/app/customer/${result.data.customer_id}`);
        } else {
          navigate("/app/customer");
        }
      } else {
        await updateMaterialHistory(values);
        navigate(`/app/customer/${values.customer_id}`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (isNew) navigate("/app/customer");
    else if (customerId) navigate(`/app/customer/${customerId}`);
    else navigate(`/app/customer/${materialHistoryData.customer.id}`);
  };

  // Prepare breadcrumbs
  const breadcrumbs = [
    { label: "Customers", url: "/app/customers" },
    materialHistoryData
      ? {
          label: "Material history",
          url: `/app/customer/${materialHistoryData.customer.id}`,
        }
      : { label: "Material history", url: "/app/customers" },
    {
      label: isNew ? "New material history" : `#${id?.toString()}`,
      url: isNew ? "" : `/app/customer/${customerId}`,
    },
  ];

  if (!isNew && materialHistoryLoading) return <LoadingCircle />;

  const initialValues: MaterialHistoryFormValues = isNew
    ? {
        customer_id: materialHistoryData.customer.id ?? 0,
        order_id: "" as UUID,
        material_id: materialHistoryData.material.id ?? 0,
        amount: 0,
        notes: "Anyag hozatal",
      }
    : mapMaterialHistoryToFormValues(materialHistoryData as MaterialHistory);

  return (
    <div className="p-4">
      <CustomBreadCrumb model={breadcrumbs} />
      <div className="mt-6 mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">
          {isNew ? "Create Material history" : `Edit: #${id?.toString()}`}
        </h1>
      </div>

      <Card className="bg-white rounded-lg shadow">
        <CardHeader>
          <CardTitle>Material History Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Formik<MaterialHistoryFormValues>
            initialValues={initialValues}
            validationSchema={MaterialHistorySchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              isSubmitting,
              setFieldValue,
            }) => (
              <Form className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <MaterialHistoryFormSection
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    setFieldValue={setFieldValue}
                    customers={customers}
                    materials={materials}
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <FormActions
                    isSubmitting={isSubmitting}
                    onCancel={handleCancel}
                    submitText={isNew ? "Create materialHistory" : "Save"}
                    submittingText={
                      isNew ? "Creating materialHistory..." : "Saving..."
                    }
                  />
                </div>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
