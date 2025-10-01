import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CustomBreadCrumb from "@/components/common/CustomBreadcrumb";
import LoadingCircle from "@/components/common/LoadingCircle";
import { FormInput } from "@/components/common/form/FormInput";
import FormActions from "@/components/common/form/FormAction";
import { ShippingPriceSchema } from "@/components/app/validationSchemas";
import useGetShippingPrice from "../hooks/useGetShippingPrice";
import useUpdateShippingPrice from "../hooks/useUpdateShippingPrice";
import useCreateShippingPrice from "../hooks/useCreateShippingPrice";

interface EditShippingPriceProps {
  isNew?: boolean;
}

export default function ViewShippingPrice({
  isNew = false,
}: Readonly<EditShippingPriceProps>) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { shippingPriceData, isLoading } = useGetShippingPrice(isNew);
  const { createShippingPrice } = useCreateShippingPrice();
  const { updateShippingPrice } = useUpdateShippingPrice();

  const handleSubmit = async (values: ShippingPrice) => {
    setIsSubmitting(true);
    try {
      if (isNew) {
        await createShippingPrice(values);
      } else {
        await updateShippingPrice(values);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
      navigate("/app/settings");
    }
  };

  const handleCancel = () => {
    navigate("/app/settings");
  };

  const breadcrumbs = [
    { label: "Settings", url: "/app/settings" },
    { label: "Shipping", url: "/app/settings" },
    {
      label: isNew ? "New Shipping Price" : shippingPriceData.price.toString(),
      url: isNew ? "" : `/app/settings/shipping/${id}`,
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
          {isNew ? "Create Shipping Price" : `Edit: ${shippingPriceData.price}`}
        </h1>
      </div>

      <Card className="bg-white rounded-lg shadow">
        <CardHeader>
          <CardTitle>Shipping Price Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={shippingPriceData}
            validationSchema={ShippingPriceSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {(formik) => (
              <Form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormInput
                    id="price"
                    name="price"
                    label="Price*"
                    placeholder="Shipping price"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.price && formik.errors.price}
                  />
                </div>

                <FormActions
                  isSubmitting={isSubmitting}
                  onCancel={handleCancel}
                  submitText={isNew ? "Create" : "Save"}
                  submittingText={isNew ? "Creating..." : "Saving..."}
                />
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
