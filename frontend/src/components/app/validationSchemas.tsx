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

export const ProductSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  category_id: Yup.number()
    .typeError("Category is required")
    .required("Category is required"),
  weight: Yup.number().nullable().min(0, "Weight must be positive"),
  size: Yup.string().nullable().max(255, "Size must be at most 255 characters"),
  image_url: Yup.string()
    .nullable()
    .url("Must be a valid URL")
    .max(255, "Image URL too long"),
  notes: Yup.string().nullable(),
  gems: Yup.array().of(
    Yup.object().shape({
      id: Yup.number().required("Gem is required"),
      count: Yup.number()
        .required("Count is required")
        .min(1, "Count must be at least 1"),
    })
  ),
});

export const GemShapeSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});

export const GemColorSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});

export const GemSchema = Yup.object().shape({
  size: Yup.string()
    .required("Gem size is required")
    .trim()
    .min(1, "Gem size cannot be empty"),
  color: GemColorSchema.required("Gem color is required"),
  shape: GemShapeSchema.required("Gem shape is required"),
  price: Yup.number()
    .required("Price is required")
    .min(0, "Price cannot be negative"),
  booking_price: Yup.number()
    .required("Booking price is required")
    .min(0, "Booking price cannot be negative"),
  updated_at: Yup.string().optional(),
});
