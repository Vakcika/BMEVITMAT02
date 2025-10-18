import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Formik, Form } from "formik";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CustomBreadCrumb from "@/components/common/CustomBreadcrumb";
import LoadingCircle from "@/components/common/LoadingCircle";
import { CustomerSchema } from "../validationSchemas";
import FormActions from "../../common/form/FormAction";
import Description from "./components/edit/customer/Description";
import Address from "./components/edit/customer/Address";
import CompanyInformation from "./components/edit/customer/CompanyInformation";
import ContactInformation from "./components/edit/customer/ContactInfromation";
import useGetCustomer from "./hooks/customer/useGetCustomer";
import useCreateCustomer from "./hooks/customer/useCreateCustomer";
import useUpdateCustomer from "./hooks/customer/useUpdateCustomer";

interface EditCustomerProps {
  isNew?: boolean;
}

export default function EditCustomer({
  isNew = false,
}: Readonly<EditCustomerProps>) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { customerData, isLoading } = useGetCustomer(isNew);
  const { createCustomer } = useCreateCustomer();
  const { updateCustomer } = useUpdateCustomer();

  const handleSubmit = async (values: Customer) => {
    setIsSubmitting(true);
    try {
      if (isNew) {
        const { data } = await createCustomer(values);
        toast.success("Customer created successfully");

        if (data) {
          navigate(`/app/customer/${data.id}`);
        } else {
          navigate("/app/customer");
        }
      } else {
        await updateCustomer(values);
        toast.success("Customer updated successfully");
        navigate(`/app/customer/${id}`);
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
      navigate("/app/customers");
    } else {
      navigate(`/app/customer/${id}`);
    }
  };

  const breadcrumbs = [
    { label: "Customers", url: "/app/customers" },
    {
      label: isNew ? "New Customer" : customerData.company_name,
      url: isNew ? "" : `/app/customer/${id}`,
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
          {isNew ? "Create Customer" : `Edit: ${customerData.company_name}`}
        </h1>
      </div>

      <Card className="bg-white rounded-lg shadow">
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={customerData}
            validationSchema={CustomerSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {(formik) => (
              <Form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <CompanyInformation formik={formik} />

                  <ContactInformation formik={formik} />

                  <Address formik={formik} />

                  <Description formik={formik} />
                </div>

                <FormActions
                  isSubmitting={isSubmitting}
                  onCancel={handleCancel}
                  submitText={isNew ? "Create customer" : "Save"}
                  submittingText={isNew ? "Creating customer" : "Saving..."}
                />
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
