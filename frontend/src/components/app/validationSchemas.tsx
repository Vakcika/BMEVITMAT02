import * as Yup from "yup";

export const CustomerSchema = Yup.object().shape({
  name: Yup.string().required("Contact name is required"),
  company_name: Yup.string().required("Company name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone_number: Yup.string(),
  website: Yup.string().url("Must be a valid URL").nullable(),
  tax_number: Yup.number().nullable(),
  address: Yup.string().nullable(),
  description: Yup.string().nullable(),
});
