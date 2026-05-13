import { useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { ROUTES } from '@/config/routes';
import { listAccounts } from '@/feature/accounts/api/accounts.api';
import { ExpenseOverviewTab } from '@/feature/accounts/types/accountsOverview.types';
import { listCurrencies } from '@/feature/currencies/api/currencies.api';
import { ApiError } from '@/services/api';
import { useAuthStore } from '@/store/auth.store';
import { Account } from '@/types/account.types';
import { Currency } from '@/types/currency.types';
import { fallbackCurrencies, getCurrencyById } from '@/utils/currency';

export const useAccountsOverview = () => {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const clearSession = useAuthStore((state) => state.clearSession);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [currencies, setCurrencies] = useState<Currency[]>(fallbackCurrencies);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAccountId, setSelectedAccountId] = useState<number | null>(null);
  const [isAccountPickerVisible, setIsAccountPickerVisible] = useState(false);
  const [selectedExpenseTab, setSelectedExpenseTab] =
    useState<ExpenseOverviewTab>('personal');

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
        await clearSession();
        router.replace(ROUTES.AUTH_LOGIN);
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
  }, [clearSession, router, token]);

  useEffect(() => {
    void refreshAccounts();
  }, [refreshAccounts]);

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
  }, [activeAccounts, selectedAccountId]);

  const openAccountPicker = () => {
    if (activeAccounts.length > 0) {
      setIsAccountPickerVisible(true);
    }
  };

  const closeAccountPicker = () => {
    setIsAccountPickerVisible(false);
  };

  const selectAccount = (accountId: number) => {
    setSelectedAccountId(accountId);
    setIsAccountPickerVisible(false);
  };

  return {
    activeAccounts,
    closeAccountPicker,
    currencies,
    displayCurrency,
    error,
    isAccountPickerVisible,
    isLoading,
    openAccountPicker,
    refreshAccounts,
    selectedAccount,
    selectedExpenseTab,
    selectAccount,
    setSelectedExpenseTab,
    userFirstName,
  };
};
