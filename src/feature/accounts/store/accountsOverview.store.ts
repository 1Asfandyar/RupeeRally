import { create } from 'zustand';

import type {
  AccountsOverviewStore,
  AccountsOverviewStoreState,
} from '@/feature/accounts/types/accountsOverview.types';
import { fallbackCurrencies } from '@/utils/currency';

const initialAccountsOverviewState: AccountsOverviewStoreState = {
  accounts: [],
  categoryDashboard: null,
  categoryDashboardError: null,
  currencies: fallbackCurrencies,
  error: null,
  isAccountPickerVisible: false,
  isCategoryDashboardLoading: false,
  isLoading: true,
  selectedAccountId: null,
  selectedCategoryId: null,
  selectedExpenseTab: 'personal',
};

export const useAccountsOverviewStore = create<AccountsOverviewStore>((set) => ({
  ...initialAccountsOverviewState,
  closeAccountPicker: () => set({ isAccountPickerVisible: false }),
  openAccountPicker: () => set({ isAccountPickerVisible: true }),
  resetAccountsOverview: () => set(initialAccountsOverviewState),
  setAccounts: (accounts) => set({ accounts }),
  setCategoryDashboard: (categoryDashboard) => set({ categoryDashboard }),
  setCategoryDashboardError: (categoryDashboardError) =>
    set({ categoryDashboardError }),
  setCurrencies: (currencies) => set({ currencies }),
  setError: (error) => set({ error }),
  setIsCategoryDashboardLoading: (isCategoryDashboardLoading) =>
    set({ isCategoryDashboardLoading }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setSelectedAccountId: (selectedAccountId) => set({ selectedAccountId }),
  setSelectedCategoryId: (selectedCategoryId) => set({ selectedCategoryId }),
  setSelectedExpenseTab: (selectedExpenseTab) => set({ selectedExpenseTab }),
}));
