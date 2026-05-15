import type { Ionicons } from '@expo/vector-icons';

import type { Category } from '@/feature/categories/types/category.types';
import type { Account } from '@/types/account.types';

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

export type Transaction = Omit<TransactionPayload, 'note'> & {
  id: number;
  note?: string | null;
  user_id?: number;
  created_at?: string;
  updated_at?: string;
};

export type TransactionsStoreState = {
  categories: Category[];
  error: string | null;
  isAccountContextLoading: boolean;
  isLoading: boolean;
  transactions: Transaction[];
};

export type TransactionsStoreActions = {
  resetTransactions: () => void;
  setCategories: (categories: Category[]) => void;
  setError: (error: string | null) => void;
  setIsAccountContextLoading: (isLoading: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setTransactions: (transactions: Transaction[]) => void;
};

export type TransactionsStore = TransactionsStoreState &
  TransactionsStoreActions;

export type TransactionListItem = {
  amountLabel: string;
  categoryLabel: string;
  color: string;
  dateLabel: string;
  iconName: keyof typeof Ionicons.glyphMap;
  id: number;
  note?: string;
  softColor: string;
  title: string;
  typeLabel: string;
};

export type TransactionsSummaryMetric = {
  amountLabel: string;
  color: string;
  iconName: keyof typeof Ionicons.glyphMap;
  label: string;
  softColor: string;
  type: TransactionType;
};

export type TransactionsViewModel = {
  accountBalanceLabel: string;
  accountCurrencyCode: string;
  error: string | null;
  hasAccount: boolean;
  hasTransactions: boolean;
  isLoading: boolean;
  onRefresh: () => void;
  selectedAccount?: Account;
  summaryMetrics: TransactionsSummaryMetric[];
  transactions: TransactionListItem[];
};

export type TransactionsViewProps = {
  transactions: TransactionsViewModel;
};

export type TransactionsAccountCardProps = {
  accountBalanceLabel: string;
  accountCurrencyCode: string;
  selectedAccount?: Account;
};

export type TransactionsStatusProps = {
  error: string | null;
  hasAccount: boolean;
  isLoading: boolean;
  onRetry: () => void;
};

export type TransactionsSummaryProps = {
  metrics: TransactionsSummaryMetric[];
};

export type TransactionsSummaryMetricProps = {
  metric: TransactionsSummaryMetric;
};

export type TransactionListProps = {
  transactions: TransactionListItem[];
};

export type TransactionRowProps = {
  transaction: TransactionListItem;
};
