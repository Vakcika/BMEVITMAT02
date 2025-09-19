import { UUID } from "crypto";

interface Transaction {
  id: UUID;
  amount: number;
  date: string;
  note: string | null;
  created_at: string;
  updated_at: string;
}
