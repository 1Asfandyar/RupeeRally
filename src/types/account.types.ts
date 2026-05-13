export type Account = {
  id: number;
  name: string;
  current_balance_cents: number;
  initial_balance_cents: number;
  is_archived: boolean;
  currency_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
};

export type CreateAccountPayload = {
  name: string;
  current_balance_cents?: number;
  initial_balance_cents?: number;
  currency_id?: number;
};

export type UpdateAccountPayload = {
  name?: string;
  current_balance_cents?: number;
  initial_balance_cents?: number;
  currency_id?: number;
};
