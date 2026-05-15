import { useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo } from 'react';

import { ROUTES } from '@/config/routes';
import { listAccounts } from '@/feature/accounts/api/accounts.api';
import { useAccountsOverviewStore } from '@/feature/accounts/store/accountsOverview.store';
import type { AccountsOverviewViewModel } from '@/feature/accounts/types/accountsOverview.types';
import type { TransactionCategoryBreakdown } from '@/feature/categories/types/categoryDashboard.types';
import { listCurrencies } from '@/feature/currencies/api/currencies.api';
import { listTransactionsByCategory } from '@/feature/transactions/api/transactions.api';
import { ApiError } from '@/services/api';
import { useAuthStore } from '@/store/auth.store';
import { fallbackCurrencies, getCurrencyById } from '@/utils/currency';

const getDashboardTotals = (categories: TransactionCategoryBreakdown[]) =>
  categories.reduce(
    (totals, item) => {
      const amount = Math.abs(item.amount_cents);

      if (item.category.category_type === 'income') {
        return {
          ...totals,
          totalIncomeCents: totals.totalIncomeCents + amount,
        };
      }

      return {
        ...totals,
        totalExpenseCents: totals.totalExpenseCents + amount,
      };
    },
    { totalExpenseCents: 0, totalIncomeCents: 0 },
  );

export const useAccountsOverview = (): AccountsOverviewViewModel => {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const clearSession = useAuthStore((state) => state.clearSession);
  const {
    accounts,
    categoryDashboard,
    categoryDashboardError,
    closeAccountPicker: closeStoredAccountPicker,
    currencies,
    error,
    isAccountPickerVisible,
    isCategoryDashboardLoading,
    isLoading,
    openAccountPicker: openStoredAccountPicker,
    selectedAccountId,
    selectedCategoryId,
    selectedExpenseTab,
    setAccounts,
    setCategoryDashboard,
    setCategoryDashboardError,
    setCurrencies,
    setError,
    setIsCategoryDashboardLoading,
    setIsLoading,
    setSelectedAccountId,
    setSelectedCategoryId,
    setSelectedExpenseTab,
  } = useAccountsOverviewStore();

  const activeAccounts = useMemo(
    () => accounts.filter((account) => !account.is_archived),
    [accounts],
  );
  const selectedAccount = useMemo(
    () =>
      activeAccounts.find((account) => account.id === selectedAccountId) ??
      activeAccounts[0],
    [activeAccounts, selectedAccountId],
  );
  const displayCurrencyId =
    selectedAccount?.currency_id ?? user?.currency_id ?? activeAccounts[0]?.currency_id;
  const displayCurrency = getCurrencyById(displayCurrencyId, currencies);
  const userFirstName = user?.full_name?.split(' ')[0];
  const categoryBreakdowns = useMemo(
    () =>
      [...(categoryDashboard?.categories ?? [])].sort(
        (first, second) =>
          Math.abs(second.amount_cents) - Math.abs(first.amount_cents),
      ),
    [categoryDashboard],
  );
  const categoryTotals = useMemo(
    () => getDashboardTotals(categoryBreakdowns),
    [categoryBreakdowns],
  );
  const selectedCategoryBreakdown = useMemo(
    () =>
      categoryBreakdowns.find(
        (item) => item.category.id === selectedCategoryId,
      ),
    [categoryBreakdowns, selectedCategoryId],
  );

  const redirectToLogin = useCallback(async () => {
    await clearSession();
    router.replace(ROUTES.AUTH_LOGIN);
  }, [clearSession, router]);

  const refreshAccounts = useCallback(async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const [nextAccounts, nextCurrencies] = await Promise.all([
        listAccounts(token),
        listCurrencies(token).catch((error: unknown) => {
          if (error instanceof ApiError && error.status === 401) {
            throw error;
          }

          return fallbackCurrencies;
        }),
      ]);

      setAccounts(nextAccounts);
      setCurrencies(nextCurrencies.length > 0 ? nextCurrencies : fallbackCurrencies);
    } catch (requestError) {
      if (requestError instanceof ApiError && requestError.status === 401) {
        await redirectToLogin();
        return;
      }

      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Could not load accounts.',
      );
    } finally {
      setIsLoading(false);
    }
  }, [
    redirectToLogin,
    setAccounts,
    setCurrencies,
    setError,
    setIsLoading,
    token,
  ]);

  const refreshCategoryDashboard = useCallback(async () => {
    if (!token || !selectedAccount?.id || selectedExpenseTab !== 'personal') {
      setCategoryDashboard(null);
      setCategoryDashboardError(null);
      setIsCategoryDashboardLoading(false);
      return;
    }

    setIsCategoryDashboardLoading(true);
    setCategoryDashboardError(null);

    try {
      const nextDashboard = await listTransactionsByCategory(
        token,
        selectedAccount.id,
      );

      setCategoryDashboard(nextDashboard);
    } catch (requestError) {
      if (requestError instanceof ApiError && requestError.status === 401) {
        await redirectToLogin();
        return;
      }

      setCategoryDashboardError(
        requestError instanceof Error
          ? requestError.message
          : 'Could not load category dashboard.',
      );
    } finally {
      setIsCategoryDashboardLoading(false);
    }
  }, [
    redirectToLogin,
    selectedAccount?.id,
    selectedExpenseTab,
    setCategoryDashboard,
    setCategoryDashboardError,
    setIsCategoryDashboardLoading,
    token,
  ]);

  const refreshOverview = useCallback(() => {
    void refreshAccounts();
    void refreshCategoryDashboard();
  }, [refreshAccounts, refreshCategoryDashboard]);

  useEffect(() => {
    void refreshAccounts();
  }, [refreshAccounts]);

  useEffect(() => {
    void refreshCategoryDashboard();
  }, [refreshCategoryDashboard]);

  useEffect(() => {
    if (activeAccounts.length === 0) {
      setSelectedAccountId(null);
      return;
    }

    const hasSelectedAccount = activeAccounts.some(
      (account) => account.id === selectedAccountId,
    );

    if (!hasSelectedAccount) {
      setSelectedAccountId(activeAccounts[0].id);
    }
  }, [activeAccounts, selectedAccountId, setSelectedAccountId]);

  useEffect(() => {
    setSelectedCategoryId(null);
  }, [selectedAccount?.id, selectedExpenseTab, setSelectedCategoryId]);

  useEffect(() => {
    if (selectedCategoryId && !selectedCategoryBreakdown) {
      setSelectedCategoryId(null);
    }
  }, [selectedCategoryBreakdown, selectedCategoryId, setSelectedCategoryId]);

  const openAccountPicker = useCallback(() => {
    if (activeAccounts.length > 0) {
      openStoredAccountPicker();
    }
  }, [activeAccounts.length, openStoredAccountPicker]);

  const selectAccount = useCallback((accountId: number) => {
    setSelectedAccountId(accountId);
    closeStoredAccountPicker();
  }, [closeStoredAccountPicker, setSelectedAccountId]);

  const selectDashboardCategory = useCallback((categoryId: number) => {
    setSelectedCategoryId(categoryId);
  }, [setSelectedCategoryId]);

  const closeDashboardCategory = useCallback(() => {
    setSelectedCategoryId(null);
  }, [setSelectedCategoryId]);

  return {
    activeAccounts,
    categoryBreakdowns,
    categoryDashboard,
    categoryDashboardError,
    categoryTotals,
    closeAccountPicker: closeStoredAccountPicker,
    closeDashboardCategory,
    currencies,
    displayCurrency,
    error,
    isCategoryDashboardLoading,
    isAccountPickerVisible,
    isLoading,
    openAccountPicker,
    refreshAccounts,
    refreshCategoryDashboard,
    refreshOverview,
    selectedAccount,
    selectedCategoryBreakdown,
    selectedExpenseTab,
    selectAccount,
    selectDashboardCategory,
    setSelectedExpenseTab,
    userFirstName,
  };
};
