import { Ionicons } from '@expo/vector-icons';
import { Modal, TouchableOpacity, View } from 'react-native';

import type { AccountPickerModalProps } from '@/feature/accounts/types/accountsOverview.types';
import ThemedText from '@/theme/components/ThemedText';
import { themeColors } from '@/theme/utilities';
import { formatCents } from '@/utils/currency';

const AccountPickerModal = ({
  accounts,
  currencies,
  isVisible,
  onClose,
  onSelectAccount,
  selectedAccount,
}: AccountPickerModalProps) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/40">
        <TouchableOpacity
          activeOpacity={1}
          className="flex-1"
          accessibilityRole="button"
          accessibilityLabel="Close account selector"
          onPress={onClose}
        />

        <View className="rounded-t-[32px] bg-white px-6 pb-8 pt-5">
          <View className="mb-5 flex-row items-center justify-between">
            <View>
              <ThemedText className="text-xl text-gray-900" weight="bold">
                Choose account
              </ThemedText>
              <ThemedText className="mt-1 text-sm text-gray-500">
                Switch the balance card view.
              </ThemedText>
            </View>

            <TouchableOpacity
              activeOpacity={0.75}
              accessibilityRole="button"
              accessibilityLabel="Close account selector"
              onPress={onClose}
              className="h-10 w-10 items-center justify-center rounded-full bg-gray-100"
            >
              <Ionicons name="close" size={22} color={themeColors.gray700} />
            </TouchableOpacity>
          </View>

          {accounts.map((account) => {
            const isSelected = account.id === selectedAccount?.id;

            return (
              <TouchableOpacity
                key={account.id}
                activeOpacity={0.78}
                accessibilityRole="button"
                accessibilityLabel={`Select ${account.name}`}
                onPress={() => onSelectAccount(account.id)}
                className={`mb-3 flex-row items-center rounded-2xl border px-4 py-4 ${
                  isSelected ? 'border-primary bg-primary/10' : 'border-gray-200 bg-white'
                }`}
              >
                <View className="h-11 w-11 items-center justify-center rounded-full bg-white">
                  <Ionicons
                    name="wallet-outline"
                    size={21}
                    color={isSelected ? themeColors.primary : themeColors.gray700}
                  />
                </View>

                <View className="ml-3 flex-1">
                  <ThemedText
                    className="text-base text-gray-900"
                    weight="semiBold"
                    numberOfLines={1}
                  >
                    {account.name}
                  </ThemedText>
                  <ThemedText className="mt-1 text-sm text-gray-500">
                    {formatCents(
                      account.current_balance_cents,
                      account.currency_id,
                      currencies,
                    )}
                  </ThemedText>
                </View>
                {isSelected ? (
                  <Ionicons
                    name="checkmark-circle"
                    size={22}
                    color={themeColors.primary}
                  />
                ) : null}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </Modal>
  );
};

export default AccountPickerModal;
