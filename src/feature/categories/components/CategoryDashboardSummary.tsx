import { StyleSheet, View } from 'react-native';

import CategorySummaryMetric from '@/feature/categories/components/CategorySummaryMetric';
import type { CategoryDashboardSummaryProps } from '@/feature/categories/types/categoryDashboard.types';

const CategoryDashboardSummary = ({
  metrics,
}: CategoryDashboardSummaryProps) => (
  <View className="flex-row" style={styles.summaryRow}>
    {metrics.map((metric) => (
      <CategorySummaryMetric key={metric.tone} metric={metric} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  summaryRow: {
    columnGap: 12,
  },
});

export default CategoryDashboardSummary;
