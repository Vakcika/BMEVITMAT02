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

export const ShippingPriceSchema = Yup.object().shape({
  price: Yup.number()
    .required("Price is required")
    .min(0, "Price cannot be negative"),
});

export const MaterialSchema = Yup.object().shape({
  customer_id: Yup.mixed().required("Customer is required"),
  type: Yup.string()
    .required("Material type is required")
    .trim()
    .min(1, "Material type cannot be empty"),
  name: Yup.string()
    .required("Material name is required")
    .trim()
    .min(1, "Material name cannot be empty")
    .max(255, "Material name cannot exceed 255 characters"),
  raw_casting_price: Yup.number()
    .required("Raw casting price is required")
    .min(0, "Raw casting price cannot be negative"),
  wrought_casting_price: Yup.number()
    .required("Wrought casting price is required")
    .min(0, "Wrought casting price cannot be negative"),
  raw_casting_loss: Yup.number()
    .required("Raw casting loss is required")
    .min(0, "Raw casting loss cannot be negative"),
  wrought_casting_loss: Yup.number()
    .required("Wrought casting loss is required")
    .min(0, "Wrought casting loss cannot be negative"),
  mark_price: Yup.number()
    .required("Mark price is required")
    .min(0, "Mark price cannot be negative"),
  trade_in_price: Yup.number()
    .required("Trade in price is required")
    .min(0, "Trade in price cannot be negative"),
  stub_placement_price: Yup.number()
    .required("Stub placement price is required")
    .min(0, "Stub placement price cannot be negative"),
  stub_removal_price: Yup.number()
    .required("Stub removal price is required")
    .min(0, "Stub removal price cannot be negative"),
  extra_charge: Yup.number()
    .min(0, "Extra charge cannot be negative")
    .optional(),
});
