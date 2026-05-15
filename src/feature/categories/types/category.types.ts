import type { TransactionType } from '@/feature/transactions/types/transaction.types';

export type Category = {
  id: number;
  name: string;
  icon: string | null;
  color: string | null;
  category_type: TransactionType;
  user_id: number;
  created_at: string;
  updated_at: string;
};
