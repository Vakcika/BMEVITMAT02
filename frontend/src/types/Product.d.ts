interface ProductCategory {
  id: number;
  name: string;
}

interface Gem {
  id: number;
  color_name: string;
  shape_name: string;
  size: string;
}

interface ProductGem {
  id: number;
  count: number;
}

interface Product {
  id: number;
  name: string;
  category: string;
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
