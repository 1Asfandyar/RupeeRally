import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

import {
  SharedExpenseDashboardEmptyState,
  SharedExpenseDashboardErrorState,
  SharedExpenseDashboardLoadingState,
} from '@/feature/transactions/components/SharedExpenseDashboardState';
import { useSharedExpenseDashboard } from '@/feature/transactions/hooks/useSharedExpenseDashboard';
import type {
  SharedExpenseDashboardFriendItem,
  SharedExpenseDashboardProps,
  SharedExpenseDashboardTransactionItem,
} from '@/feature/transactions/types/sharedExpenseDashboard.types';
import ThemedText from '@/theme/components/ThemedText';
import { themeColors } from '@/theme/utilities';

const EXPENSE_COLOR = '#DC2626';

const SharedTransactionRow = ({
  transaction,
}: {
  transaction: SharedExpenseDashboardTransactionItem;
}) => (
  <View className="mt-3 flex-row items-center">
    <View className="h-9 w-9 items-center justify-center rounded-full bg-red-50">
      <Ionicons name="receipt-outline" size={17} color={EXPENSE_COLOR} />
    </View>

    <View className="ml-3 min-w-0 flex-1">
      <ThemedText
        className="text-sm text-gray-900"
        numberOfLines={1}
        weight="semiBold"
      >
        {transaction.title}
      </ThemedText>
      <ThemedText className="mt-0.5 text-xs text-gray-500" numberOfLines={1}>
        {transaction.note
          ? `${transaction.dateLabel} - ${transaction.note}`
          : transaction.dateLabel}
      </ThemedText>
    </View>

    <ThemedText
      adjustsFontSizeToFit
      className="ml-3 text-sm"
      numberOfLines={1}
      style={{ color: EXPENSE_COLOR, maxWidth: 92 }}
      weight="bold"
    >
      {transaction.amountLabel}
    </ThemedText>
  </View>
);

const SharedExpenseFriendCard = ({
  item,
}: {
  item: SharedExpenseDashboardFriendItem;
}) => (
  <View className="mt-2 rounded-2xl border border-gray-100 bg-white p-4">
    <View className="flex-row items-center">
      <View className="h-12 w-12 items-center justify-center rounded-full bg-lightBlue">
        <ThemedText className="text-base text-primary" weight="bold">
          {item.initial}
        </ThemedText>
      </View>

      <View className="ml-3 min-w-0 flex-1">
        <ThemedText
          className="text-base text-gray-900"
          numberOfLines={1}
          weight="semiBold"
        >
          {item.name}
        </ThemedText>
        <ThemedText className="mt-0.5 text-xs text-gray-500" numberOfLines={1}>
          {item.email ?? item.transactionCountLabel}
        </ThemedText>
      </View>

      <View className="ml-3 items-end">
        <ThemedText
          adjustsFontSizeToFit
          className="text-base"
          numberOfLines={1}
          style={{ color: EXPENSE_COLOR, maxWidth: 104 }}
          weight="bold"
        >
          {item.amountLabel}
        </ThemedText>
        <ThemedText className="mt-0.5 text-xs text-gray-500">
          {item.transactionCountLabel}
        </ThemedText>
      </View>
    </View>

    <View className="mt-3 border-t border-gray-100 pt-1">
      {item.transactions.map((transaction) => (
        <SharedTransactionRow
          key={`${item.id}-${transaction.id}`}
          transaction={transaction}
        />
      ))}
    </View>

    {item.hiddenTransactionCount > 0 ? (
      <View className="mt-3 self-start rounded-full bg-gray-100 px-3 py-1">
        <ThemedText className="text-xs text-gray-500" weight="semiBold">
          + {item.hiddenTransactionCount} more
        </ThemedText>
      </View>
    ) : null}
  </View>
);

const SharedExpenseDashboard = ({
  currencies,
  displayCurrency,
  error,
  friends,
  isLoading,
  onRetry,
  selectedAccount,
}: SharedExpenseDashboardProps) => {
  const dashboard = useSharedExpenseDashboard({
    currencies,
    displayCurrency,
    friends,
  });

  if (isLoading) {
    return <SharedExpenseDashboardLoadingState />;
  }

  if (error) {
    return <SharedExpenseDashboardErrorState error={error} onRetry={onRetry} />;
  }

  if (!selectedAccount) {
    return null;
  }

  if (!dashboard.hasFriends) {
    return <SharedExpenseDashboardEmptyState />;
  }

  return (
    <View>
      <View className="rounded-2xl border border-gray-100 bg-white p-4">
        <View className="flex-row items-center">
          <View className="h-11 w-11 items-center justify-center rounded-full bg-lightBlue">
            <Ionicons
              name="people-outline"
              size={21}
              color={themeColors.primary}
            />
          </View>
          <View className="ml-3 flex-1">
            <ThemedText className="text-sm text-gray-500">
              Shared split total
            </ThemedText>
            <ThemedText className="mt-1 text-xl text-gray-900" weight="bold">
              {dashboard.summary.amountLabel}
            </ThemedText>
          </View>
          <View className="items-end">
            <ThemedText className="text-xs text-gray-500">
              {dashboard.summary.friendCountLabel}
            </ThemedText>
            <ThemedText className="mt-1 text-xs text-gray-500">
              {dashboard.summary.splitCountLabel}
            </ThemedText>
          </View>
        </View>
      </View>

      {dashboard.items.map((item) => (
        <SharedExpenseFriendCard key={item.id} item={item} />
      ))}
    </View>
  );
};

export default SharedExpenseDashboard;
