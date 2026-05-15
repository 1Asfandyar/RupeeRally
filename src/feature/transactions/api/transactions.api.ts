import { apiRequest } from '@/services/api';
import type {
  ListAccountTransactionsParams,
  Transaction,
  TransactionPayload,
} from '@/feature/transactions/types/transaction.types';
import type { TransactionsByCategoryDashboard } from '@/feature/categories/types/categoryDashboard.types';

export const createTransaction = async (
  token: string,
  payload: TransactionPayload,
) => {
  const result = await apiRequest<{ success: true; transaction: Transaction }>(
    '/api/v0/transactions',
    {
      method: 'POST',
      token,
      body: payload,
    },
  );

  return result.data.transaction;
};

export const listTransactionsByCategory = async (
  token: string,
  accountId: number,
) => {
  const query = `account_id=${encodeURIComponent(
    String(accountId),
  )}&by_category=true`;
  const result = await apiRequest<
    { success: true } & TransactionsByCategoryDashboard
  >(`/api/v0/transactions?${query}`, { token });

  return {
    total_amount_cents: result.data.total_amount_cents ?? 0,
    total_absolute_amount_cents: result.data.total_absolute_amount_cents ?? 0,
    categories: result.data.categories ?? [],
  };
};

export const listAccountTransactions = async (
  token: string,
  accountId: number,
  params: ListAccountTransactionsParams = { fromDate: '', toDate: '' },
) => {
  const queryParams = new URLSearchParams({
    account_id: String(accountId),
  });
  const trimmedSearch = params.search?.trim();

  if (trimmedSearch) {
    queryParams.set('search', trimmedSearch);
  }

  if (params.fromDate) {
    queryParams.set('from', params.fromDate);
  }

  if (params.toDate) {
    queryParams.set('to', params.toDate);
  }

  const result = await apiRequest<{ success: true; transactions: Transaction[] }>(
    `/api/v0/transactions?${queryParams.toString()}`,
    { token },
  );

  return result.data.transactions ?? [];
};
