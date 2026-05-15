import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import type {
  TransactionsSummaryMetricProps,
  TransactionsSummaryProps,
} from '@/feature/transactions/types/transaction.types';
import ThemedText from '@/theme/components/ThemedText';
import { themeColors } from '@/theme/utilities';

const TransactionsSummaryMetric = ({
  metric,
}: TransactionsSummaryMetricProps) => (
  <View
    className="flex-1 rounded-2xl border px-3 py-3"
    style={{
      backgroundColor: metric.softColor,
      borderColor: `${metric.color}33`,
    }}
  >
    <View className="flex-row items-center">
      <View
        className="h-8 w-8 items-center justify-center rounded-full"
        style={{ backgroundColor: metric.color }}
      >
        <Ionicons name={metric.iconName} size={17} color={themeColors.white} />
      </View>
      <ThemedText
        className="ml-2 text-xs uppercase text-gray-500"
        weight="semiBold"
      >
        {metric.label}
      </ThemedText>
    </View>
    <ThemedText
      adjustsFontSizeToFit
      className="mt-3 text-lg"
      numberOfLines={1}
      style={{ color: metric.color }}
      weight="bold"
    >
      {metric.amountLabel}
    </ThemedText>
  </View>
);

const TransactionsSummary = ({ metrics }: TransactionsSummaryProps) => (
  <View className="mt-4 flex-row" style={styles.summaryRow}>
    {metrics.map((metric) => (
      <TransactionsSummaryMetric key={metric.type} metric={metric} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  summaryRow: {
    columnGap: 12,
  },
});

export default TransactionsSummary;
