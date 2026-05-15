import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';

import { transactionTypeTabs } from '@/feature/transactions/constants/addTransactionRecord.constants';
import type { TransactionTypeTabsProps } from '@/feature/transactions/types/addTransactionRecord.types';
import ThemedText from '@/theme/components/ThemedText';
import { themeColors } from '@/theme/utilities';

const TransactionTypeTabs = ({
  selectedType,
  onSelectType,
}: TransactionTypeTabsProps) => (
  <View accessibilityRole="tablist" className="flex-row rounded-2xl bg-gray-100 p-1">
    {transactionTypeTabs.map((tab) => {
      const isSelected = tab.value === selectedType;

      return (
        <TouchableOpacity
          key={tab.value}
          activeOpacity={0.8}
          accessibilityRole="tab"
          accessibilityState={{ selected: isSelected }}
          onPress={() => onSelectType(tab.value)}
          className={`flex-1 flex-row items-center justify-center rounded-xl px-3 py-3 ${
            isSelected ? 'bg-white' : ''
          }`}
        >
          <Ionicons
            name={tab.iconName}
            size={18}
            color={isSelected ? themeColors.primary : themeColors.gray500}
          />
          <ThemedText
            className={`ml-2 text-sm ${
              isSelected ? 'text-gray-900' : 'text-gray-500'
            }`}
            weight="semiBold"
          >
            {tab.label}
          </ThemedText>
        </TouchableOpacity>
      );
    })}
  </View>
);

export default TransactionTypeTabs;
