interface ProductCategory {
  id: number;
  name: string;
  created_at?: string;
  updated_at: string;
}

interface ProductGem {
  id: number;
  count: number;
  created_at?: string;
  updated_at: string;
}

interface Product {
  id: number;
  name: string;
  category: ProductCategory;
  gems: (Gem & { count: number })[];
  weight?: number;
  size?: string;
  image_url?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

interface ProductFormValues {
  id?: number;
  name: string;
  category_id: number | "";
  gems: ProductGem[];
  weight?: number;
  size?: string;
  image_url?: string;
  notes?: string;
}

interface ShippingPrice {
  id: number;
  price: number;
  created_at?: string;
  updated_at: string;
}
