import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';

import { SelectedAccountBalanceCardProps } from '@/feature/accounts/types/accountsOverview.types';
import ThemedText from '@/theme/components/ThemedText';
import { themeColors } from '@/theme/utilities';
import { formatCents } from '@/utils/currency';

const SelectedAccountBalanceCard = ({
  currencies,
  displayCurrency,
  onChangeAccountPress,
  selectedAccount,
}: SelectedAccountBalanceCardProps) => {
  return (
    <View className="mt-8 rounded-3xl bg-secondary px-5 py-6">
      <View className="flex-row items-start justify-between">
        <View className="flex-1 pr-4">
          <ThemedText className="text-sm uppercase tracking-wide text-white/60">
            Account
          </ThemedText>
          <ThemedText
            className="pb-2 text-2xl text-white"
            weight="semiBold"
            numberOfLines={1}
          >
            {selectedAccount?.name ?? 'No account selected'}
          </ThemedText>
          <ThemedText className="text-sm text-white/70">
            Current balance in {displayCurrency.code}
          </ThemedText>
          <ThemedText
            className="mt-1 text-3xl text-white"
            weight="bold"
            numberOfLines={1}
          >
            {formatCents(
              selectedAccount?.current_balance_cents ?? 0,
              displayCurrency.id,
              currencies,
            )}
          </ThemedText>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Change account"
          onPress={onChangeAccountPress}
          className="h-12 w-12 items-center justify-center rounded-full bg-white/15"
        >
          <Ionicons
            name="swap-horizontal-outline"
            size={24}
            color={themeColors.white}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SelectedAccountBalanceCard;
