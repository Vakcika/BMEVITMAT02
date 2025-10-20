import { UUID } from "crypto";

interface Transaction {
  id: UUID;
  customer: Customer;
  order_id?: number;
  amount: number;
  balance: number;
  note: string | null;
  created_at: string;
  updated_at: string;
}

interface TransactionFormValues {
  id?: UUID;
  customer_id: number;
  amount: number;
  note: string | null;
}
