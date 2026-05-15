export type TransactionType = 'expense' | 'income';

export type TransactionPayload = {
  title: string;
  transaction_type: TransactionType;
  amount_cents: number;
  account_id: number;
  category_id: number;
  transaction_date: string;
  note: string;
  currency_id: number;
};

export type Transaction = TransactionPayload & {
  id: number;
  user_id?: number;
  created_at?: string;
  updated_at?: string;
};
