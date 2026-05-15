import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

import type { TransactionsAccountCardProps } from '@/feature/transactions/types/transaction.types';
import ThemedText from '@/theme/components/ThemedText';
import { themeColors } from '@/theme/utilities';

const TransactionsAccountCard = ({
  accountBalanceLabel,
  accountCurrencyCode,
  selectedAccount,
}: TransactionsAccountCardProps) => (
  <View className="mt-5 rounded-2xl bg-secondary px-4 py-4">
    <View className="flex-row items-center">
      <View className="h-11 w-11 items-center justify-center rounded-full bg-white/15">
        <Ionicons name="wallet-outline" size={22} color={themeColors.white} />
      </View>
      <View className="ml-3 flex-1">
        <ThemedText className="text-xs uppercase text-white/60">
          Current account
        </ThemedText>
        <ThemedText className="text-lg text-white" numberOfLines={1} weight="semiBold">
          {selectedAccount?.name ?? 'No account selected'}
        </ThemedText>
      </View>
      <View className="ml-3 items-end">
        <ThemedText className="text-xs uppercase text-white/60">
          {accountCurrencyCode}
        </ThemedText>
        <ThemedText
          adjustsFontSizeToFit
          className="max-w-32 text-base text-white"
          numberOfLines={1}
          weight="bold"
        >
          {accountBalanceLabel}
        </ThemedText>
      </View>
    </View>
  </View>
);

export default TransactionsAccountCard;
