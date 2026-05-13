import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, TouchableOpacity, View } from 'react-native';

import { ROUTES } from '@/config/routes';
import { listAccounts } from '@/feature/accounts/api/accounts.api';
import { listCurrencies } from '@/feature/currencies/api/currencies.api';
import { ApiError } from '@/services/api';
import { useAuthStore } from '@/store/auth.store';
import ThemedButton from '@/theme/components/ThemedButton';
import ThemedText from '@/theme/components/ThemedText';
import { themeColors } from '@/theme/utilities';
import { Account } from '@/types/account.types';
import { Currency } from '@/types/currency.types';
import { fallbackCurrencies, formatCents, getCurrencyById } from '@/utils/currency';

const AccountsOverview = () => {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const clearSession = useAuthStore((state) => state.clearSession);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [currencies, setCurrencies] = useState<Currency[]>(fallbackCurrencies);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const activeAccounts = useMemo(
    () => accounts.filter((account) => !account.is_archived),
    [accounts],
  );
  const totalBalanceCents = activeAccounts.reduce(
    (total, account) => total + account.current_balance_cents,
    0,
  );
  const displayCurrencyId = user?.currency_id ?? activeAccounts[0]?.currency_id;
  const displayCurrency = getCurrencyById(displayCurrencyId, currencies);

  const loadAccounts = useCallback(async () => {
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
    void loadAccounts();
  }, [loadAccounts]);

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 32 }}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <ThemedText className="text-2xl text-gray-900" weight="semiBold">
          Dashboard
        </ThemedText>
        <ThemedText className="mt-2 text-gray-500">
          Welcome{user?.full_name ? `, ${user.full_name}` : ''}
        </ThemedText>
      </View>

      <View className="mt-8 rounded-2xl bg-secondary px-5 py-6">
        <View className="flex-row items-center justify-between">
          <View>
            <ThemedText className="text-sm text-white/70">
              Total balance
            </ThemedText>
            <ThemedText className="mt-2 text-3xl text-white" weight="bold">
              {formatCents(totalBalanceCents, displayCurrency.id, currencies)}
            </ThemedText>
          </View>

          <View className="h-12 w-12 items-center justify-center rounded-full bg-white/15">
            <Ionicons name="wallet-outline" size={24} color={themeColors.white} />
          </View>
        </View>

        <ThemedText className="mt-4 text-sm text-white/70">
          {activeAccounts.length} active{' '}
          {activeAccounts.length === 1 ? 'account' : 'accounts'} in{' '}
          {displayCurrency.code}
        </ThemedText>
      </View>

      <View className="mt-8 flex-row items-center justify-between">
        <ThemedText className="text-lg text-gray-900" weight="semiBold">
          Accounts
        </ThemedText>

        <TouchableOpacity
          activeOpacity={0.75}
          accessibilityRole="button"
          accessibilityLabel="Refresh accounts"
          onPress={loadAccounts}
          className="h-10 w-10 items-center justify-center rounded-xl bg-gray-100"
        >
          <Ionicons name="refresh" size={20} color={themeColors.gray700} />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View className="mt-10 items-center">
          <ActivityIndicator color={themeColors.primary} />
          <ThemedText className="mt-3 text-sm text-gray-500">
            Loading accounts
          </ThemedText>
        </View>
      ) : null}

      {!isLoading && error ? (
        <View className="mt-5 rounded-2xl border border-gray-200 px-4 py-5">
          <ThemedText className="text-base text-gray-900" weight="semiBold">
            Accounts unavailable
          </ThemedText>
          <ThemedText className="mt-2 text-sm text-gray-500">{error}</ThemedText>
          <ThemedButton
            title="Try again"
            onPress={loadAccounts}
            variant="outline"
            containerClassName="mt-4"
          />
        </View>
      ) : null}

      {!isLoading && !error && activeAccounts.length === 0 ? (
        <View className="mt-5 rounded-2xl border border-gray-200 px-4 py-5">
          <View className="h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Ionicons name="card-outline" size={22} color={themeColors.primary} />
          </View>
          <ThemedText className="mt-4 text-base text-gray-900" weight="semiBold">
            No accounts yet
          </ThemedText>
          <ThemedText className="mt-2 text-sm leading-5 text-gray-500">
            Add an account during onboarding to see balances here.
          </ThemedText>
        </View>
      ) : null}

      {!isLoading && !error
        ? activeAccounts.map((account) => (
            <View
              key={account.id}
              className="mt-3 flex-row items-center rounded-2xl border border-gray-200 px-4 py-4"
            >
              <View className="h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Ionicons
                  name="wallet-outline"
                  size={22}
                  color={themeColors.primary}
                />
              </View>

              <View className="ml-4 flex-1">
                <ThemedText
                  className="text-base text-gray-900"
                  weight="semiBold"
                  numberOfLines={1}
                >
                  {account.name}
                </ThemedText>
                <ThemedText className="mt-1 text-sm text-gray-500">
                  Initial{' '}
                  {formatCents(
                    account.initial_balance_cents,
                    account.currency_id,
                    currencies,
                  )}
                </ThemedText>
              </View>

              <ThemedText className="text-base text-gray-900" weight="semiBold">
                {formatCents(
                  account.current_balance_cents,
                  account.currency_id,
                  currencies,
                )}
              </ThemedText>
            </View>
          ))
        : null}
    </ScrollView>
  );
};

export default AccountsOverview;
