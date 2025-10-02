import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CustomBreadCrumb from "@/components/common/CustomBreadcrumb";
import LoadingCircle from "@/components/common/LoadingCircle";
import { FormInput } from "@/components/common/form/FormInput";
import FormActions from "@/components/common/form/FormAction";
import { UserSchema } from "@/components/app/validationSchemas";
import useGetUser from "../hooks/useGetUser";
import useUpdateUser from "../hooks/useUpdateUsers";
import useCreateUser from "../hooks/useCreateUser";

interface EditUserProps {
  isNew?: boolean;
}

export default function ViewUser({ isNew = false }: Readonly<EditUserProps>) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { userData, isLoading } = useGetUser(isNew);
  const { createUser } = useCreateUser();
  const { updateUser } = useUpdateUser();

  const handleSubmit = async (values: User) => {
    setIsSubmitting(true);
    try {
      if (isNew) {
        await createUser(values);
      } else {
        await updateUser(values);
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
    { label: "Users", url: "/app/settings" },
    {
      label: isNew ? "New" : userData.name,
      url: isNew ? "" : `/app/settings/users/${id}`,
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
          {isNew ? "Create User" : `Edit: ${userData.name}`}
        </h1>
      </div>

      <Card className="bg-white rounded-lg shadow">
        <CardHeader>
          <CardTitle>User Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={userData}
            validationSchema={UserSchema}
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
                    placeholder="User name"
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
