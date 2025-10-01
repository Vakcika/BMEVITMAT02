import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Formik, Form } from "formik";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CustomBreadCrumb from "@/components/common/CustomBreadcrumb";
import LoadingCircle from "@/components/common/LoadingCircle";
import { FormInput } from "@/components/common/form/FormInput";
import FormActions from "@/components/common/form/FormAction";
import useCreateGemShape from "../hooks/useCreateGemShape";
import useGetGemShape from "../hooks/useGetGemShape";
import useUpdateGemShape from "../hooks/useUpdateGemShape";
import { GemShapeSchema } from "@/components/app/validationSchemas";

interface EditGemShapeProps {
  isNew?: boolean;
}

export default function ViewGemShape({
  isNew = false,
}: Readonly<EditGemShapeProps>) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { gemShapeData, isLoading } = useGetGemShape(isNew);
  const { createGemShape } = useCreateGemShape();
  const { updateGemShape } = useUpdateGemShape();

  const handleSubmit = async (values: GemShape) => {
    setIsSubmitting(true);
    try {
      if (isNew) {
        const { data } = await createGemShape(values);
        toast.success(`Gem shape ${data.name} created successfully`);

        navigate("/app/gems");
      } else {
        await updateGemShape(values);
        toast.success("Gem shape updated successfully");
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
    { label: "Gem shapes", url: "/app/gems" },
    {
      label: isNew ? "New Gem Shape" : gemShapeData.name,
      url: isNew ? "" : `/app/gems/gem-shape/${id}`,
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
          {isNew ? "Create Gem Shape" : `Edit: ${gemShapeData.name}`}
        </h1>
      </div>

      <Card className="bg-white rounded-lg shadow">
        <CardHeader>
          <CardTitle>Gem Shape Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={gemShapeData}
            validationSchema={GemShapeSchema}
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
                    placeholder="Gem shape name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && formik.errors.name}
                  />
                </div>

                <FormActions
                  isSubmitting={isSubmitting}
                  onCancel={handleCancel}
                  submitText={isNew ? "Create gem shape" : "Save"}
                  submittingText={isNew ? "Creating gem shape..." : "Saving..."}
                />
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
