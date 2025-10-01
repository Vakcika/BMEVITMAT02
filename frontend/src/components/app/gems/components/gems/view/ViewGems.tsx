import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Formik, Form } from "formik";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CustomBreadCrumb from "@/components/common/CustomBreadcrumb";
import LoadingCircle from "@/components/common/LoadingCircle";
import { FormInput } from "@/components/common/form/FormInput";
import { FormSelect } from "@/components/common/form/FormSelect";
import FormActions from "@/components/common/form/FormAction";
import { GemSchema } from "@/components/app/validationSchemas";
import useGetGem from "../hooks/useGetGem";
import useCreateGem from "../hooks/useCreateGem";
import useUpdateGem from "../hooks/useUpdateGem";
import useGetGemColors from "../../gem-colors/hooks/useGetGemColors";
import useGetGemShapes from "../../gem-shapes/hooks/useGetGemShapes";

interface EditGemProps {
  isNew?: boolean;
}

export default function ViewGem({ isNew = false }: Readonly<EditGemProps>) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { gemData, isLoading } = useGetGem(isNew);
  const { createGem } = useCreateGem();
  const { updateGem } = useUpdateGem();
  const { colors, isLoading: colorsLoading } = useGetGemColors();
  const { shapes, isLoading: shapesLoading } = useGetGemShapes();

  const handleSubmit = async (values: Gem) => {
    setIsSubmitting(true);
    try {
      const requestData: GemRequest = {
        ...(values.id && { id: values.id }),
        size: values.size,
        color_id: values.color.id,
        shape_id: values.shape.id,
        price: values.price,
        booking_price: values.booking_price,
      };

      if (isNew) {
        const { data } = await createGem(requestData);
        toast.success(`Gem ${data.id} created successfully`);
        navigate("/app/gems");
      } else {
        const { data } = await updateGem(requestData);
        toast.success(`Gem ${data.id} updated successfully`);
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
    {
      label: isNew ? "New Gem" : gemData.id.toString(),
      url: isNew ? "" : `/app/gems/${id}`,
    },
  ];

  if (!isNew && isLoading) {
    return <LoadingCircle />;
  }

  if (colorsLoading || shapesLoading) {
    return <LoadingCircle />;
  }

  return (
    <div className="p-4">
      <CustomBreadCrumb model={breadcrumbs} />
      <div className="mt-6 mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">
          {isNew ? "Create Gem" : `Edit: ${gemData.id}`}
        </h1>
      </div>

      <Card className="bg-white rounded-lg shadow">
        <CardHeader>
          <CardTitle>Gem Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={gemData}
            validationSchema={GemSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {(formik) => (
              <Form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormInput
                    id="size"
                    name="size"
                    label="Size*"
                    placeholder="Gem size"
                    value={formik.values.size}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.size && formik.errors.size}
                  />

                  <FormSelect
                    name="color"
                    label="Color*"
                    value={formik.values.color?.id?.toString() ?? ""}
                    onChange={(value) => {
                      const selectedColor = colors.find(
                        (c) => c.id === Number(value)
                      );
                      formik.setFieldValue("color", selectedColor);
                    }}
                    options={colors}
                    getOptionValue={(c) => c.id.toString()}
                    getOptionLabel={(c) => c.name}
                    placeholder="Select color"
                    emptyLabel="None"
                    error={
                      formik.touched.color && formik.errors.color
                        ? "Color is required"
                        : undefined
                    }
                  />

                  <FormSelect
                    name="shape"
                    label="Shape*"
                    value={formik.values.shape?.id?.toString() ?? ""}
                    onChange={(value) => {
                      const selectedShape = shapes.find(
                        (s) => s.id === Number(value)
                      );
                      formik.setFieldValue("shape", selectedShape);
                    }}
                    options={shapes}
                    getOptionValue={(s) => s.id.toString()}
                    getOptionLabel={(s) => s.name}
                    placeholder="Select shape"
                    emptyLabel="None"
                    error={
                      formik.touched.shape && formik.errors.shape
                        ? "Shape is required"
                        : undefined
                    }
                  />

                  <FormInput
                    id="price"
                    name="price"
                    label="Price*"
                    type="number"
                    placeholder="0.00"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.price && formik.errors.price}
                  />

                  <FormInput
                    id="booking_price"
                    name="booking_price"
                    label="Booking Price*"
                    type="number"
                    placeholder="0.00"
                    value={formik.values.booking_price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.booking_price &&
                      formik.errors.booking_price
                    }
                  />
                </div>

                <FormActions
                  isSubmitting={isSubmitting}
                  onCancel={handleCancel}
                  submitText={isNew ? "Create gem" : "Save"}
                  submittingText={isNew ? "Creating gem..." : "Saving..."}
                />
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
