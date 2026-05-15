import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, View } from 'react-native';

import type { AccountsOverviewStatusProps } from '@/feature/accounts/types/accountsOverview.types';
import ThemedButton from '@/theme/components/ThemedButton';
import ThemedText from '@/theme/components/ThemedText';
import { themeColors } from '@/theme/utilities';

const AccountsOverviewStatus = ({
  error,
  hasAccounts,
  isLoading,
  onRetry,
}: AccountsOverviewStatusProps) => {
  if (isLoading) {
    return (
      <View className="mt-10 items-center">
        <ActivityIndicator color={themeColors.primary} />
        <ThemedText className="mt-3 text-sm text-gray-500">
          Loading accounts
        </ThemedText>
      </View>
    );
  }

  if (error) {
    return (
      <View className="mt-5 rounded-2xl border border-gray-200 px-4 py-5">
        <ThemedText className="text-base text-gray-900" weight="semiBold">
          Accounts unavailable
        </ThemedText>
        <ThemedText className="mt-2 text-sm leading-5 text-gray-500">
          {error}
        </ThemedText>
        <ThemedButton
          title="Try again"
          onPress={onRetry}
          variant="outline"
          containerClassName="mt-4"
        />
      </View>
    );
  }

  if (!hasAccounts) {
    return (
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
    );
  }

  return null;
};

export default AccountsOverviewStatus;
