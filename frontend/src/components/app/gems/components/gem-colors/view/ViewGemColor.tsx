import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Formik, Form } from "formik";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CustomBreadCrumb from "@/components/common/CustomBreadcrumb";
import LoadingCircle from "@/components/common/LoadingCircle";
import { FormInput } from "@/components/common/form/FormInput";
import FormActions from "@/components/common/form/FormAction";
import { GemColorSchema } from "@/components/app/validationSchemas";
import useGetGemColor from "../hooks/useGetGemColor";
import useUpdateGemColor from "../hooks/useUpdateGemColor";
import useCreateGemColor from "../hooks/useCreateGemColor";

interface EditGemColorProps {
  isNew?: boolean;
}

export default function ViewGemColor({
  isNew = false,
}: Readonly<EditGemColorProps>) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { gemColorData, isLoading } = useGetGemColor(isNew);
  const { createGemColor } = useCreateGemColor();
  const { updateGemColor } = useUpdateGemColor();

  const handleSubmit = async (values: GemColor) => {
    setIsSubmitting(true);
    try {
      if (isNew) {
        const { data } = await createGemColor(values);
        toast.success(`Gem color ${data.name} created successfully`);

        navigate("/app/gems");
      } else {
        await updateGemColor(values);
        toast.success("Gem color updated successfully");
        navigate(`/app/gems`);
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ?? error?.message ?? "Failed to save"
      );
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/app/gems");
  };

  const breadcrumbs = [
    { label: "Gems", url: "/app/gems" },
    { label: "Gem colors", url: "/app/gems" },
    {
      label: isNew ? "New Gem Color" : gemColorData.name,
      url: isNew ? "" : `/app/gems/gem-color/${id}`,
    },
  ];

  if (!isNew && isLoading) {
    return <LoadingCircle />;
  }

  return (
    <div className="p-4">
      <CustomBreadCrumb model={breadcrumbs} />
      <div className="mt-6 mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">
          {isNew ? "Create Gem Color" : `Edit: ${gemColorData.name}`}
        </h1>
      </div>

      <Card className="bg-white rounded-lg shadow">
        <CardHeader>
          <CardTitle>Gem Color Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={gemColorData}
            validationSchema={GemColorSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {(formik) => (
              <Form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormInput
                    id="name"
                    name="name"
                    label="Name*"
                    placeholder="Gem color name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && formik.errors.name}
                  />
                </div>

                <FormActions
                  isSubmitting={isSubmitting}
                  onCancel={handleCancel}
                  submitText={isNew ? "Create gem color" : "Save"}
                  submittingText={isNew ? "Creating gem color..." : "Saving..."}
                />
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
