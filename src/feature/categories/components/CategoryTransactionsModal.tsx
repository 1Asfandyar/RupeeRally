import { Ionicons } from '@expo/vector-icons';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import type { CategoryTransactionsModalProps } from '@/feature/categories/types/categoryDashboard.types';
import type { Transaction } from '@/feature/transactions/types/transaction.types';
import ThemedText from '@/theme/components/ThemedText';
import { themeColors } from '@/theme/utilities';
import type { Currency } from '@/types/currency.types';
import { formatCents } from '@/utils/currency';

const TYPE_COLORS = {
  expense: '#DC2626',
  income: '#16A34A',
} as const;

const formatPercentage = (percentage: number) => {
  if (!Number.isFinite(percentage)) return '0%';

  return `${Math.min(100, Math.max(0, percentage)).toFixed(0)}%`;
};

const getSoftColor = (color: string) =>
  /^#[0-9a-f]{6}$/i.test(color) ? `${color}1A` : themeColors.gray100;

const getSignedTransactionAmount = (transaction: Transaction) =>
  transaction.transaction_type === 'expense'
    ? -Math.abs(transaction.amount_cents)
    : Math.abs(transaction.amount_cents);

const formatSignedCents = (
  cents: number,
  currencyId: number,
  currencies: Currency[],
) => {
  const sign = cents >= 0 ? '+' : '-';

  return `${sign}${formatCents(Math.abs(cents), currencyId, currencies)}`;
};

const formatTransactionDate = (value?: string) => {
  if (!value) return 'No date';

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return 'No date';

  return date.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const CategoryTransactionsModal = ({
  categoryBreakdown,
  currencies,
  displayCurrency,
  isVisible,
  onClose,
}: CategoryTransactionsModalProps) => {
  if (!categoryBreakdown) {
    return null;
  }

  const { category, transactions } = categoryBreakdown;
  const isIncome = category.category_type === 'income';
  const color = category.color ?? TYPE_COLORS[category.category_type];
  const categoryAmount =
    category.category_type === 'expense'
      ? -Math.abs(categoryBreakdown.amount_cents)
      : Math.abs(categoryBreakdown.amount_cents);

  return (
    <Modal
      animationType="slide"
      onRequestClose={onClose}
      transparent
      visible={isVisible}
    >
      <View style={styles.modalRoot}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Close transactions"
          onPress={onClose}
          style={styles.backdrop}
        />

        <View className="rounded-t-3xl bg-white px-5 pb-6 pt-4" style={styles.sheet}>
          <View className="mb-4 h-1.5 w-12 self-center rounded-full bg-gray-200" />

          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-4">
              <View
                className="mb-3 self-start rounded-full px-3 py-1"
                style={{ backgroundColor: getSoftColor(color) }}
              >
                <ThemedText
                  className="text-xs uppercase"
                  style={{ color }}
                  weight="semiBold"
                >
                  {isIncome ? 'Income' : 'Expense'}
                </ThemedText>
              </View>
              <ThemedText className="text-xl text-gray-900" weight="bold">
                {category.name}
              </ThemedText>
              <ThemedText className="mt-1 text-sm text-gray-500">
                {formatPercentage(categoryBreakdown.percentage)} of account
                balance
              </ThemedText>
            </View>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Close category transactions"
              onPress={onClose}
              className="h-10 w-10 items-center justify-center rounded-full bg-gray-100"
            >
              <Ionicons name="close" size={22} color={themeColors.gray700} />
            </Pressable>
          </View>

          <View
            className="mt-4 rounded-2xl px-4 py-3"
            style={{ backgroundColor: getSoftColor(color) }}
          >
            <ThemedText className="text-sm text-gray-500">
              Category total
            </ThemedText>
            <ThemedText
              className="mt-1 text-2xl"
              style={{ color }}
              weight="bold"
            >
              {formatSignedCents(categoryAmount, displayCurrency.id, currencies)}
            </ThemedText>
          </View>

          <ThemedText className="mt-5 text-base text-gray-900" weight="semiBold">
            Transactions
          </ThemedText>

          {transactions.length === 0 ? (
            <View className="mt-4 items-center rounded-2xl border border-dashed border-gray-200 px-4 py-7">
              <Ionicons
                name="receipt-outline"
                size={28}
                color={themeColors.gray400}
              />
              <ThemedText className="mt-3 text-center text-sm leading-5 text-gray-500">
                No transactions were returned for this category.
              </ThemedText>
            </View>
          ) : (
            <ScrollView
              className="mt-2"
              contentContainerStyle={styles.transactionList}
              showsVerticalScrollIndicator={false}
            >
              {transactions.map((transaction) => {
                const signedAmount = getSignedTransactionAmount(transaction);
                const transactionColor =
                  transaction.transaction_type === 'income'
                    ? TYPE_COLORS.income
                    : TYPE_COLORS.expense;

                return (
                  <View
                    key={transaction.id}
                    className="mt-3 flex-row items-center rounded-2xl border border-gray-100 px-4 py-3"
                  >
                    <View
                      className="h-10 w-10 items-center justify-center rounded-full"
                      style={{ backgroundColor: getSoftColor(transactionColor) }}
                    >
                      <Ionicons
                        name={
                          transaction.transaction_type === 'income'
                            ? 'arrow-up-outline'
                            : 'arrow-down-outline'
                        }
                        size={18}
                        color={transactionColor}
                      />
                    </View>

                    <View className="ml-3 flex-1">
                      <ThemedText
                        className="text-sm text-gray-900"
                        numberOfLines={1}
                        weight="semiBold"
                      >
                        {transaction.title || category.name}
                      </ThemedText>
                      <ThemedText className="mt-1 text-xs text-gray-500">
                        {formatTransactionDate(transaction.transaction_date)}
                      </ThemedText>
                      {transaction.note ? (
                        <ThemedText
                          className="mt-1 text-xs text-gray-400"
                          numberOfLines={1}
                        >
                          {transaction.note}
                        </ThemedText>
                      ) : null}
                    </View>

                    <ThemedText
                      adjustsFontSizeToFit
                      className="ml-3 text-sm"
                      numberOfLines={1}
                      style={{ color: transactionColor, maxWidth: 96 }}
                      weight="bold"
                    >
                      {formatSignedCents(
                        signedAmount,
                        transaction.currency_id ?? displayCurrency.id,
                        currencies,
                      )}
                    </ThemedText>
                  </View>
                );
              })}
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(17, 24, 39, 0.42)',
  },
  modalRoot: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    maxHeight: '82%',
  },
  transactionList: {
    paddingBottom: 8,
  },
});

export default CategoryTransactionsModal;
