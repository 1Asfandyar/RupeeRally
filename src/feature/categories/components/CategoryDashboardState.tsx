import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, View } from 'react-native';

import type { CategoryDashboardErrorStateProps } from '@/feature/categories/types/categoryDashboard.types';
import ThemedButton from '@/theme/components/ThemedButton';
import ThemedText from '@/theme/components/ThemedText';
import { themeColors } from '@/theme/utilities';

export const CategoryDashboardLoadingState = () => (
  <View className="items-center py-7">
    <ActivityIndicator color={themeColors.primary} />
    <ThemedText className="mt-3 text-sm text-gray-500">
      Loading dashboard
    </ThemedText>
  </View>
);

export const CategoryDashboardErrorState = ({
  error,
  onRetry,
}: CategoryDashboardErrorStateProps) => (
  <View className="rounded-2xl border border-gray-200 bg-white px-4 py-5">
    <ThemedText className="text-base text-gray-900" weight="semiBold">
      Dashboard unavailable
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

export const CategoryDashboardEmptyState = () => (
  <View className="mt-4 items-center rounded-2xl border border-dashed border-gray-200 bg-white px-4 py-7">
    <View className="h-12 w-12 items-center justify-center rounded-full bg-lightBlue">
      <Ionicons name="pie-chart-outline" size={23} color={themeColors.primary} />
    </View>
    <ThemedText className="mt-4 text-base text-gray-900" weight="semiBold">
      No category activity yet
    </ThemedText>
    <ThemedText className="mt-2 text-center text-sm leading-5 text-gray-500">
      Add an income or expense record to see this account break down by category.
    </ThemedText>
  </View>
);
