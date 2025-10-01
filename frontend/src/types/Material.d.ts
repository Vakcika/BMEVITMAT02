interface Material {
  id: number;
  customer_id?: string | number;
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
