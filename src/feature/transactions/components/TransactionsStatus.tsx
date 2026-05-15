import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, View } from 'react-native';

import type { TransactionsStatusProps } from '@/feature/transactions/types/transaction.types';
import ThemedButton from '@/theme/components/ThemedButton';
import ThemedText from '@/theme/components/ThemedText';
import { themeColors } from '@/theme/utilities';

const TransactionsStatus = ({
  error,
  hasAccount,
  isLoading,
  onRetry,
}: TransactionsStatusProps) => {
  if (isLoading) {
    return (
      <View className="items-center py-10">
        <ActivityIndicator color={themeColors.primary} />
        <ThemedText className="mt-3 text-sm text-gray-500">
          Loading transactions
        </ThemedText>
      </View>
    );
  }

  if (error) {
    return (
      <View className="mt-5 rounded-2xl border border-gray-200 bg-white px-4 py-5">
        <ThemedText className="text-base text-gray-900" weight="semiBold">
          Transactions unavailable
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

  if (!hasAccount) {
    return (
      <View className="mt-5 rounded-2xl border border-gray-200 bg-white px-4 py-5">
        <View className="h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Ionicons name="wallet-outline" size={22} color={themeColors.primary} />
        </View>
        <ThemedText className="mt-4 text-base text-gray-900" weight="semiBold">
          No account selected
        </ThemedText>
        <ThemedText className="mt-2 text-sm leading-5 text-gray-500">
          Add or select an account to see its transaction history.
        </ThemedText>
      </View>
    );
  }

  return null;
};

export default TransactionsStatus;
