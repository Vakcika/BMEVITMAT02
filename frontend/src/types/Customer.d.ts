interface Customer {
  id: number;
  company_name: string;
  name: string;
  phone_number: string;
  email: string;
  address: string;
  tax_number: string;
  website: string;
  description: string;
  balances?: CustomerBalances;
  created_at: string;
  updated_at?: string;
}

interface CustomerBalances {
  by_type: Record<string, number>; // e.g. { "14K": 5.2, "SILVER": 3.1 }
  total_gold_14k_equivalent: number;
  total_materials: number;
  transactions: number;
}
