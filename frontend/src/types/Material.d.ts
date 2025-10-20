import { UUID } from "crypto";

interface Material {
  id: number;
  customer_id?: number | null;
  type: string;
  name: string;
  raw_casting_price: number;
  wrought_casting_price: number;
  raw_casting_loss: number;
  wrought_casting_loss: number;
  mark_price: number;
  trade_in_price: number;
  stub_placement_price: number;
  stub_removal_price: number;
  extra_charge: number;
  created_at?: string;
  updated_at: string;
}

interface MaterialHistory {
  id: UUID;
  customer: Customer;
  order: Order;
  material: Material;
  amount: number;
  balances: Record<string, number>;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

interface MaterialHistoryFormValues {
  id?: UUID;
  customer_id: number;
  material_id: number;
  order_id?: UUID;
  amount: number;
  notes: string | null;
}
