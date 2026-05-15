import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';

import type { AddTransactionFabViewProps } from '@/feature/transactions/types/addTransactionFab.types';
import ThemedText from '@/theme/components/ThemedText';
import { themeColors } from '@/theme/utilities';

const AddTransactionFabView = ({
  bottomOffset,
  isExpanded,
  onAddPersonalPress,
  onAddSharedPress,
  onTogglePress,
}: AddTransactionFabViewProps) => {
  return (
    <View
      pointerEvents="box-none"
      className="absolute right-5 z-20"
      style={{ bottom: bottomOffset }}
    >
      {isExpanded ? (
        <View className="mb-3 w-56 self-end overflow-hidden rounded-3xl border border-primary/50 bg-white py-2 shadow-lg">
          <TouchableOpacity
            activeOpacity={0.9}
            accessibilityLabel="Add personal transaction"
            accessibilityRole="button"
            onPress={onAddPersonalPress}
            className="min-h-14 flex-row items-center px-4 py-3"
          >
            <View className="h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Ionicons name="person-outline" size={18} color={themeColors.primary} />
            </View>
            <ThemedText className="ml-5 text-md text-gray-900" weight="semiBold">
              Add personal
            </ThemedText>
          </TouchableOpacity>

          <View className="mx-4 h-px bg-primary/50" />

          <TouchableOpacity
            activeOpacity={0.9}
            accessibilityLabel="Add shared transaction"
            accessibilityRole="button"
            onPress={onAddSharedPress}
            className="min-h-14 flex-row items-center px-4 py-3"
          >
            <View className="h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Ionicons name="people-outline" size={18} color={themeColors.primary} />
            </View>
            <ThemedText className="ml-5 text-md text-gray-900" weight="semiBold">
              Add shared
            </ThemedText>
          </TouchableOpacity>
        </View>
      ) : null}

      <TouchableOpacity
        activeOpacity={0.9}
        accessibilityLabel={isExpanded ? 'Hide transaction actions' : 'Show transaction actions'}
        accessibilityRole="button"
        onPress={onTogglePress}
        className={`h-[60px] w-[60px] items-center justify-center self-end rounded-full shadow-lg ${
          isExpanded ? 'border border-primary/20 bg-primary/10' : 'bg-primary'
        }`}
      >
        <Ionicons
          name={isExpanded ? 'close' : 'add'}
          size={28}
          color={isExpanded ? themeColors.primaryDark : themeColors.white}
        />
      </TouchableOpacity>
    </View>
  );
};

export default AddTransactionFabView;
