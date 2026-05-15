import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

import type { CategorySummaryMetricProps } from '@/feature/categories/types/categoryDashboard.types';
import ThemedText from '@/theme/components/ThemedText';
import { themeColors } from '@/theme/utilities';

const CategorySummaryMetric = ({ metric }: CategorySummaryMetricProps) => (
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

export default CategorySummaryMetric;
