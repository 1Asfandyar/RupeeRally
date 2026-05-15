import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import CategoryProgressIcon from '@/feature/categories/components/CategoryProgressIcon';
import type {
  CategoryBreakdownListProps,
  CategoryBreakdownRowProps,
} from '@/feature/categories/types/categoryDashboard.types';
import ThemedText from '@/theme/components/ThemedText';
import { themeColors } from '@/theme/utilities';

const CategoryBreakdownRow = ({
  item,
  onPress,
}: CategoryBreakdownRowProps) => (
  <TouchableOpacity
    activeOpacity={0.82}
    accessibilityRole="button"
    accessibilityLabel={item.accessibilityLabel}
    onPress={() => onPress(item.id)}
    className="mt-3 flex-row items-center rounded-2xl border border-gray-100 bg-white p-3"
    style={styles.categoryCard}
  >
    <CategoryProgressIcon
      activeSegmentCount={item.activeSegmentCount}
      color={item.color}
      iconName={item.iconName}
      softColor={item.softColor}
    />

    <View className="ml-3 flex-1">
      <ThemedText
        className="text-base text-gray-900"
        numberOfLines={1}
        weight="semiBold"
      >
        {item.name}
      </ThemedText>
      <ThemedText
        className="mt-1 text-sm"
        style={{ color: item.typeColor }}
        weight="medium"
      >
        {item.typeLabel}
      </ThemedText>
      <View
        className="mt-2 self-start rounded-full px-2 py-1"
        style={{ backgroundColor: item.softColor }}
      >
        <ThemedText
          className="text-xs"
          style={{ color: item.color }}
          weight="semiBold"
        >
          {item.percentageLabel}
        </ThemedText>
      </View>
    </View>

    <View className="ml-2 items-end">
      <ThemedText
        adjustsFontSizeToFit
        className="text-base"
        numberOfLines={1}
        style={{
          color: item.typeColor,
          maxWidth: 106,
        }}
        weight="bold"
      >
        {item.amountLabel}
      </ThemedText>
      <Ionicons
        name="chevron-forward"
        size={19}
        color={themeColors.gray400}
        style={styles.categoryChevron}
      />
    </View>
  </TouchableOpacity>
);

const CategoryBreakdownList = ({
  items,
  onSelectCategory,
}: CategoryBreakdownListProps) => (
  <View className="mt-1">
    {items.map((item) => (
      <CategoryBreakdownRow
        key={item.id}
        item={item}
        onPress={onSelectCategory}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  categoryCard: {
    shadowColor: themeColors.black,
    shadowOffset: { height: 8, width: 0 },
    shadowOpacity: 0.04,
    shadowRadius: 14,
  },
  categoryChevron: {
    marginTop: 18,
  },
});

export default CategoryBreakdownList;
