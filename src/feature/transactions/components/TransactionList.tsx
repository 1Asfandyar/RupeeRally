import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import type {
  TransactionListProps,
  TransactionRowProps,
} from '@/feature/transactions/types/transaction.types';
import ThemedText from '@/theme/components/ThemedText';
import { themeColors } from '@/theme/utilities';

const TransactionRow = ({ transaction }: TransactionRowProps) => (
  <View
    className="mt-3 flex-row items-center rounded-2xl border border-gray-100 bg-white px-4 py-3"
    style={styles.row}
  >
    <View
      className="h-11 w-11 items-center justify-center rounded-full"
      style={{ backgroundColor: transaction.softColor }}
    >
      <Ionicons
        name={transaction.iconName}
        size={20}
        color={transaction.color}
      />
    </View>

    <View className="ml-3 flex-1">
      <View className="flex-row items-center">
        <ThemedText
          className="flex-1 text-sm text-gray-900"
          numberOfLines={1}
          weight="semiBold"
        >
          {transaction.title}
        </ThemedText>
        <View
          className="ml-2 rounded-full px-2 py-0.5"
          style={{ backgroundColor: transaction.softColor }}
        >
          <ThemedText
            className="text-[10px] uppercase"
            style={{ color: transaction.color }}
            weight="semiBold"
          >
            {transaction.typeLabel}
          </ThemedText>
        </View>
      </View>

      <ThemedText className="mt-1 text-xs text-gray-500" numberOfLines={1}>
        {transaction.categoryLabel} - {transaction.dateLabel}
      </ThemedText>
      {transaction.note ? (
        <ThemedText className="mt-1 text-xs text-gray-400" numberOfLines={1}>
          {transaction.note}
        </ThemedText>
      ) : null}
    </View>

    <ThemedText
      adjustsFontSizeToFit
      className="ml-3 text-sm"
      numberOfLines={1}
      style={{ color: transaction.color, maxWidth: 104 }}
      weight="bold"
    >
      {transaction.amountLabel}
    </ThemedText>
  </View>
);

const TransactionList = ({ transactions }: TransactionListProps) => (
  <View className="mt-2">
    {transactions.map((transaction) => (
      <TransactionRow key={transaction.id} transaction={transaction} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  row: {
    shadowColor: themeColors.black,
    shadowOffset: { height: 8, width: 0 },
    shadowOpacity: 0.04,
    shadowRadius: 14,
  },
});

export default TransactionList;
