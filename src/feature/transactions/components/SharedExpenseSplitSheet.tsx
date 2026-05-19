import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { sharedExpenseSplitMethods } from '@/feature/transactions/constants/sharedExpenseSplit.constants';
import SharedExpenseAvatar from '@/feature/transactions/components/SharedExpenseAvatar';
import type { SharedExpenseSplitSheetProps } from '@/feature/transactions/types/addTransactionRecord.types';
import {
  getEqualSplitAmountCents,
  getSplitAmountCents,
} from '@/feature/transactions/utils/sharedExpenseSplit.utils';
import { getUserLabel } from '@/feature/groups/utils/groupMembers.utils';
import ThemedText from '@/theme/components/ThemedText';
import { fontFamilies } from '@/theme/fonts';
import { themeColors, typography } from '@/theme/utilities';
import { formatCents } from '@/utils/currency';

const getInputSuffix = (method: SharedExpenseSplitSheetProps['method']) => {
  if (method === 'percentage') {
    return '%';
  }

  if (method === 'shares') {
    return 'shares';
  }

  return '';
};

const SharedExpenseSplitSheet = ({
  currencyId,
  error,
  isVisible,
  method,
  onChangeMethod,
  onChangeValue,
  onClose,
  participants,
  totalAmountCents,
  values,
}: SharedExpenseSplitSheetProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const totalShares = useMemo(
    () =>
      participants.reduce((total, participant) => {
        const share = Number(values[String(participant.id)] ?? 0);

        return total + (Number.isFinite(share) ? share : 0);
      }, 0),
    [participants, values],
  );
  const selectedMethod =
    sharedExpenseSplitMethods.find((option) => option.value === method) ??
    sharedExpenseSplitMethods[0];

  const selectMethod = (nextMethod: SharedExpenseSplitSheetProps['method']) => {
    onChangeMethod(nextMethod);
    setIsDropdownOpen(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <View
      className="z-50 justify-end"
      pointerEvents="box-none"
      style={StyleSheet.absoluteFillObject}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Close split settings"
        className="flex-1 bg-black/40"
        onPress={onClose}
      />

      <View
        className="rounded-t-[28px] bg-white shadow-lg"
        style={{ height: '50%' }}
      >
      <View className="px-5 pt-5">
        <View className="mb-4 flex-row items-center justify-between">
          <View>
            <ThemedText className="text-xl text-gray-900" weight="bold">
              Split settings
            </ThemedText>
            <ThemedText className="mt-1 text-sm text-gray-500">
              Total {formatCents(totalAmountCents, currencyId)}
            </ThemedText>
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close split settings"
            onPress={onClose}
            className="h-10 w-10 items-center justify-center rounded-full bg-gray-100"
          >
            <Ionicons name="close" size={22} color={themeColors.gray700} />
          </Pressable>
        </View>

        <View className="mb-4">
          <ThemedText className="mb-2 text-sm text-gray-600" weight="semiBold">
            Split type
          </ThemedText>
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ expanded: isDropdownOpen }}
            onPress={() => setIsDropdownOpen((isOpen) => !isOpen)}
            className="flex-row items-center rounded-xl border border-gray-200 bg-white px-4 py-3"
          >
            <View className="min-w-0 flex-1">
              <ThemedText className="text-base text-gray-900" weight="semiBold">
                {selectedMethod.label}
              </ThemedText>
              <ThemedText
                className="mt-0.5 text-xs text-gray-500"
                numberOfLines={1}
              >
                {selectedMethod.description}
              </ThemedText>
            </View>
            <Ionicons
              name={isDropdownOpen ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={themeColors.gray500}
            />
          </Pressable>

          {isDropdownOpen ? (
            <View className="mt-2 overflow-hidden rounded-xl border border-gray-100 bg-white">
              {sharedExpenseSplitMethods.map((option) => {
                const isSelected = option.value === method;

                return (
                  <Pressable
                    key={option.value}
                    accessibilityRole="button"
                    onPress={() => selectMethod(option.value)}
                    className={`flex-row items-center px-4 py-3 ${
                      isSelected ? 'bg-primary/10' : 'bg-white'
                    }`}
                  >
                    <View className="min-w-0 flex-1">
                      <ThemedText
                        className={`text-sm ${
                          isSelected ? 'text-primary' : 'text-gray-900'
                        }`}
                        weight={isSelected ? 'semiBold' : 'regular'}
                      >
                        {option.label}
                      </ThemedText>
                      <ThemedText
                        className="mt-0.5 text-xs text-gray-500"
                        numberOfLines={1}
                      >
                        {option.description}
                      </ThemedText>
                    </View>
                    {isSelected ? (
                      <Ionicons
                        name="checkmark-circle"
                        size={20}
                        color={themeColors.primary}
                      />
                    ) : null}
                  </Pressable>
                );
              })}
            </View>
          ) : null}
        </View>

        {error ? (
          <View className="mb-3 rounded-2xl bg-red-50 px-4 py-3">
            <ThemedText className="text-sm text-red-600">{error}</ThemedText>
          </View>
        ) : null}
      </View>

      <ScrollView
        nestedScrollEnabled
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={participants.length > 4}
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 24, paddingHorizontal: 20 }}
      >
        {participants.map((participant, index) => {
          const value = values[String(participant.id)] ?? '';
          const amountCents =
            method === 'equal'
              ? getEqualSplitAmountCents(
                  totalAmountCents,
                  participants.length,
                  index,
                )
              : getSplitAmountCents(
                  method,
                  value,
                  totalAmountCents,
                  totalShares,
                );

          return (
            <View
              key={participant.id}
              className="mb-3 flex-row items-center rounded-2xl border border-gray-100 bg-white px-4 py-3"
            >
              <SharedExpenseAvatar user={participant} size={42} />
              <View className="ml-3 min-w-0 flex-1">
                <ThemedText
                  className="text-sm text-gray-900"
                  weight="semiBold"
                  numberOfLines={1}
                >
                  {getUserLabel(participant)}
                </ThemedText>
                <ThemedText className="mt-0.5 text-xs text-gray-500">
                  Owes {formatCents(amountCents, currencyId)}
                </ThemedText>
              </View>

              {method === 'equal' ? (
                <View className="rounded-xl bg-gray-50 px-3 py-2">
                  <ThemedText className="text-sm text-gray-700" weight="semiBold">
                    Equal
                  </ThemedText>
                </View>
              ) : (
                <View className="w-28 flex-row items-center rounded-xl border border-gray-200 bg-gray-50 px-3 py-2">
                  <TextInput
                    value={value}
                    onChangeText={(nextValue) =>
                      onChangeValue(participant.id, nextValue)
                    }
                    keyboardType="decimal-pad"
                    placeholder="0"
                    placeholderTextColor={themeColors.gray400}
                    className={`${typography.primaryControlSize} min-w-0 flex-1 text-right text-gray-900`}
                    style={{ fontFamily: fontFamilies.semiBold }}
                  />
                  {getInputSuffix(method) ? (
                    <ThemedText className="ml-1 text-xs text-gray-500">
                      {getInputSuffix(method)}
                    </ThemedText>
                  ) : null}
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
      </View>
    </View>
  );
};

export default SharedExpenseSplitSheet;
