import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CustomBreadCrumb from "@/components/common/CustomBreadcrumb";
import LoadingCircle from "@/components/common/LoadingCircle";
import { FormInput } from "@/components/common/form/FormInput";
import FormActions from "@/components/common/form/FormAction";
import { MaterialSchema } from "@/components/app/validationSchemas";
import useGetMaterial from "../hooks/useGetMaterial";
import useUpdateMaterial from "../hooks/useUpdateMaterial";
import useCreateMaterial from "../hooks/useCreateMaterial";
import { FormSelect } from "@/components/common/form/FormSelect";

interface EditMaterialProps {
  isNew?: boolean;
}

export default function ViewMaterial({
  isNew = false,
}: Readonly<EditMaterialProps>) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { materialData, isLoading } = useGetMaterial(isNew);
  const { createMaterial } = useCreateMaterial();
  const { updateMaterial } = useUpdateMaterial();

  const handleSubmit = async (values: Material) => {
    setIsSubmitting(true);
    try {
      if (isNew) {
        await createMaterial(values);
      } else {
        await updateMaterial(values);
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
    { label: "Materials", url: "/app/settings" },
    {
      label: isNew ? "New" : materialData.name,
      url: isNew ? "" : `/app/settings/materials/${id}`,
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
          {isNew ? "Create Material" : `Edit: ${materialData.name}`}
        </h1>
      </div>

      <Card className="bg-white rounded-lg shadow">
        <CardHeader>
          <CardTitle>Material Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={materialData}
            validationSchema={MaterialSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {(formik) => (
              <Form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-6">
                  <FormSelect<string>
                    name="type"
                    label="Material Type*"
                    value={formik.values.type}
                    onChange={(val) => formik.setFieldValue("type", val)}
                    options={["9K", "14K", "18K", "999", "SILVER", "BRONZE"]}
                    getOptionValue={(option) => option}
                    getOptionLabel={(option) => option}
                    placeholder="Select material type"
                    error={
                      formik.touched.type && formik.errors.type
                        ? formik.errors.type
                        : undefined
                    }
                  />
                  <FormInput
                    id="name"
                    name="name"
                    label="Material Name*"
                    placeholder="Enter material name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && formik.errors.name}
                  />
                  <FormInput
                    id="raw_casting_price"
                    name="raw_casting_price"
                    label="Raw Casting Price*"
                    placeholder="0.00"
                    type="number"
                    value={formik.values.raw_casting_price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.raw_casting_price &&
                      formik.errors.raw_casting_price
                    }
                  />
                  <FormInput
                    id="wrought_casting_price"
                    name="wrought_casting_price"
                    label="Wrought Casting Price*"
                    placeholder="0.00"
                    type="number"
                    value={formik.values.wrought_casting_price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.wrought_casting_price &&
                      formik.errors.wrought_casting_price
                    }
                  />
                  <FormInput
                    id="raw_casting_loss"
                    name="raw_casting_loss"
                    label="Raw Casting Loss*"
                    placeholder="0.00"
                    type="number"
                    value={formik.values.raw_casting_loss}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.raw_casting_loss &&
                      formik.errors.raw_casting_loss
                    }
                  />
                  <FormInput
                    id="wrought_casting_loss"
                    name="wrought_casting_loss"
                    label="Wrought Casting Loss*"
                    placeholder="0.00"
                    type="number"
                    value={formik.values.wrought_casting_loss}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.wrought_casting_loss &&
                      formik.errors.wrought_casting_loss
                    }
                  />
                  <FormInput
                    id="mark_price"
                    name="mark_price"
                    label="Mark Price*"
                    placeholder="0.00"
                    type="number"
                    value={formik.values.mark_price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.mark_price && formik.errors.mark_price
                    }
                  />
                  <FormInput
                    id="trade_in_price"
                    name="trade_in_price"
                    label="Trade In Price*"
                    placeholder="0.00"
                    type="number"
                    value={formik.values.trade_in_price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.trade_in_price &&
                      formik.errors.trade_in_price
                    }
                  />
                  <FormInput
                    id="stub_placement_price"
                    name="stub_placement_price"
                    label="Stub Placement Price*"
                    placeholder="0.00"
                    type="number"
                    value={formik.values.stub_placement_price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.stub_placement_price &&
                      formik.errors.stub_placement_price
                    }
                  />
                  <FormInput
                    id="stub_removal_price"
                    name="stub_removal_price"
                    label="Stub Removal Price*"
                    placeholder="0.00"
                    type="number"
                    value={formik.values.stub_removal_price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.stub_removal_price &&
                      formik.errors.stub_removal_price
                    }
                  />
                  <FormInput
                    id="extra_charge"
                    name="extra_charge"
                    label="Extra Charge"
                    placeholder="0.00"
                    type="number"
                    value={formik.values.extra_charge}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.extra_charge && formik.errors.extra_charge
                    }
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
