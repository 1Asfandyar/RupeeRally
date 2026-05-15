import type { TransactionDateFilters } from '@/feature/transactions/types/transactionDateFilter.types';

export type SearchTransactionProps = {
  dateFilters: TransactionDateFilters;
  hasActiveDateFilter: boolean;
  onApplyDateFilters: (filters: TransactionDateFilters) => void;
  onClearDateFilters: () => void;
  onClearSearch: () => void;
  onSearchQueryChange: (query: string) => void;
  searchQuery: string;
};
