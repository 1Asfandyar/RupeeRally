import { Ionicons } from '@expo/vector-icons';

import { Account } from '@/types/account.types';
import { Currency } from '@/types/currency.types';

export type ExpenseOverviewTab = 'personal' | 'shared';

export type ExpenseOverviewTabConfig = {
  label: string;
  title: string;
  value: ExpenseOverviewTab;
  iconName: keyof typeof Ionicons.glyphMap;
};

export type AccountsOverviewHeaderProps = {
  firstName?: string;
  onRefresh: () => void;
};

export type SelectedAccountBalanceCardProps = {
  selectedAccount?: Account;
  displayCurrency: Currency;
  currencies: Currency[];
  onChangeAccountPress: () => void;
};

export type AccountsOverviewStatusProps = {
  error: string | null;
  hasAccounts: boolean;
  isLoading: boolean;
  onRetry: () => void;
};

export type ExpenseOverviewTabsProps = {
  selectedTab: ExpenseOverviewTab;
  onSelectTab: (tab: ExpenseOverviewTab) => void;
};

export type AccountPickerModalProps = {
  accounts: Account[];
  currencies: Currency[];
  isVisible: boolean;
  selectedAccount?: Account;
  onClose: () => void;
  onSelectAccount: (accountId: number) => void;
};
