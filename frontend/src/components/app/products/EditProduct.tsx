import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Formik, Form } from "formik";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CustomBreadCrumb from "@/components/common/CustomBreadcrumb";
import LoadingCircle from "@/components/common/LoadingCircle";
import FormActions from "../../common/form/FormAction";
import { ProductSchema } from "../validationSchemas";
import useGetProduct from "./hooks/useGetProduct";
import useCreateProduct from "./hooks/useCreateProduct";
import useUpdateProduct from "./hooks/useUpdateProduct";
import CategorySelect from "./components/edit/CategorySelect";
import NameAndImage from "./components/edit/NameAndImage";
import Notes from "./components/edit/Notes";
import SizeAndWeight from "./components/edit/SizeAndWeight";
import GemSelector from "./components/edit/GemSelector";

interface EditProductProps {
  isNew?: boolean;
}

export default function EditProduct({
  isNew = false,
}: Readonly<EditProductProps>) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { productData, isLoading } = useGetProduct(isNew);
  const { createProduct } = useCreateProduct();
  const { updateProduct } = useUpdateProduct();

  const handleSubmit = async (values: ProductFormValues) => {
    setIsSubmitting(true);
    try {
      if (isNew) {
        const { data } = await createProduct(values);
        toast.success("Product created successfully");
        navigate(data ? `/app/product/${data.id}` : "/app/products");
      } else {
        await updateProduct(values);
        toast.success("Product updated successfully");
        navigate(`/app/product/${id}`);
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
    if (isNew) {
      navigate("/app/products");
    } else {
      navigate(`/app/product/${id}`);
    }
  };

  const breadcrumbs = [
    { label: "Products", url: "/app/products" },
    {
      label: isNew
        ? "New Product"
        : "#" + productData.id?.toString() + " " + productData.name,
      url: isNew ? "" : `/app/product/${id}`,
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
            ? "Create Product"
            : `Edit: #${productData.id} ${productData.name}`}
        </h1>
      </div>

      <Card className="bg-white rounded-lg shadow">
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={productData}
            validationSchema={ProductSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {(formik) => (
              <Form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <NameAndImage formik={formik} />
                  <SizeAndWeight formik={formik} />
                  <CategorySelect formik={formik} />
                  <Notes formik={formik} />
                  <GemSelector formik={formik} />
                </div>

                <FormActions
                  isSubmitting={isSubmitting}
                  onCancel={handleCancel}
                  submitText={isNew ? "Create product" : "Save"}
                  submittingText={isNew ? "Creating product..." : "Saving..."}
                />
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
