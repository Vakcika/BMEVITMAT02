import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CustomBreadCrumb from "@/components/common/CustomBreadcrumb";
import LoadingCircle from "@/components/common/LoadingCircle";
import { FormInput } from "@/components/common/form/FormInput";
import FormActions from "@/components/common/form/FormAction";
import { ProductCategorySchema } from "@/components/app/validationSchemas";
import useGetProductCategory from "../hooks/useGetProductCategory";
import useUpdateProductCategory from "../hooks/useUpdateProductCategory";
import useCreateProductCategory from "../hooks/useCreateProductCategory";

interface EditProductCategoryProps {
  isNew?: boolean;
}

export default function ViewProductCategory({
  isNew = false,
}: Readonly<EditProductCategoryProps>) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { productCategoryData, isLoading } = useGetProductCategory(isNew);
  const { createProductCategory } = useCreateProductCategory();
  const { updateProductCategory } = useUpdateProductCategory();

  const handleSubmit = async (values: ProductCategory) => {
    setIsSubmitting(true);
    try {
      if (isNew) {
        await createProductCategory(values);
      } else {
        await updateProductCategory(values);
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
    { label: "Product category", url: "/app/settings" },
    {
      label: isNew ? "New" : productCategoryData.name,
      url: isNew ? "" : `/app/settings/product-categories/${id}`,
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
          {isNew
            ? "Create Product Category"
            : `Edit: ${productCategoryData.name}`}
        </h1>
      </div>

      <Card className="bg-white rounded-lg shadow">
        <CardHeader>
          <CardTitle>Product Category Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={productCategoryData}
            validationSchema={ProductCategorySchema}
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
                    placeholder="Product category"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && formik.errors.name}
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
