import { Ionicons } from '@expo/vector-icons';
import { RefreshControl, ScrollView, View } from 'react-native';

import TransactionList from '@/feature/transactions/components/TransactionList';
import TransactionsAccountCard from '@/feature/transactions/components/TransactionsAccountCard';
import TransactionsStatus from '@/feature/transactions/components/TransactionsStatus';
import TransactionsSummary from '@/feature/transactions/components/TransactionsSummary';
import type { TransactionsViewProps } from '@/feature/transactions/types/transaction.types';
import ThemedText from '@/theme/components/ThemedText';
import { themeColors } from '@/theme/utilities';

const TransactionsView = ({ transactions }: TransactionsViewProps) => (
  <ScrollView
    className="flex-1 bg-gray-50"
    contentContainerStyle={{
      paddingBottom: 144,
      paddingHorizontal: 16,
      paddingTop: 16,
    }}
    refreshControl={
      <RefreshControl
        colors={[themeColors.primary]}
        refreshing={transactions.isLoading}
        tintColor={themeColors.primary}
        onRefresh={transactions.onRefresh}
      />
    }
    showsVerticalScrollIndicator={false}
  >
    <View className="flex-row items-start justify-between">
      <View className="flex-1 pr-4">
        <ThemedText className="text-2xl text-gray-900" weight="bold">
          Transactions
        </ThemedText>
        <ThemedText className="mt-1 text-sm leading-5 text-gray-500">
          All income and expenses for the current account.
        </ThemedText>
      </View>
      <View className="h-11 w-11 items-center justify-center rounded-2xl bg-white">
        <Ionicons
          name="swap-vertical-outline"
          size={22}
          color={themeColors.primary}
        />
      </View>
    </View>

    <TransactionsAccountCard
      accountBalanceLabel={transactions.accountBalanceLabel}
      accountCurrencyCode={transactions.accountCurrencyCode}
      selectedAccount={transactions.selectedAccount}
    />

    <TransactionsStatus
      error={transactions.error}
      hasAccount={transactions.hasAccount}
      isLoading={transactions.isLoading}
      onRetry={transactions.onRefresh}
    />

    {transactions.hasAccount && !transactions.isLoading && !transactions.error ? (
      <>
        <TransactionsSummary metrics={transactions.summaryMetrics} />

        <View className="mt-5">
          <ThemedText className="text-base text-gray-900" weight="semiBold">
            Recent activity
          </ThemedText>

          {transactions.hasTransactions ? (
            <TransactionList transactions={transactions.transactions} />
          ) : (
            <View className="mt-3 items-center rounded-2xl border border-dashed border-gray-200 bg-white px-4 py-7">
              <Ionicons
                name="receipt-outline"
                size={28}
                color={themeColors.gray400}
              />
              <ThemedText className="mt-3 text-center text-sm leading-5 text-gray-500">
                No transactions found for this account yet.
              </ThemedText>
            </View>
          )}
        </View>
      </>
    ) : null}
  </ScrollView>
);

export default TransactionsView;
