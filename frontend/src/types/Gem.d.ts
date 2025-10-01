interface Gem {
  id: number;
  size: string;
  color: GemColor;
  shape: GemShape;
  price: number;
  booking_price: number;
  created_at: string;
  updated_at?: string;
}

interface GemShape {
  id: number;
  name: string;
  created_at?: string;
  updated_at: string;
}

interface GemColor {
  id: number;
  name: string;
  created_at?: string;
  updated_at: string;
}

interface GemRequest {
  id?: number;
  size: string;
  color_id: number;
  shape_id: number;
  price: number;
  booking_price: number;
}
