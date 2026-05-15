import { Ionicons } from '@expo/vector-icons';
import { useMemo } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { CategoryPickerModalProps } from '@/feature/transactions/types/addTransactionRecord.types';
import ThemedText from '@/theme/components/ThemedText';
import { fontFamilies } from '@/theme/fonts';
import { themeColors, typography } from '@/theme/utilities';

const CategoryPickerModal = ({
  isVisible,
  onClose,
  onQueryChange,
  onSelect,
  options,
  query,
  selectedId,
}: CategoryPickerModalProps) => {
  const normalizedQuery = query.trim().toLowerCase();
  const filteredOptions = useMemo(
    () =>
      normalizedQuery.length === 0
        ? options
        : options.filter((option) =>
            option.label.toLowerCase().includes(normalizedQuery),
          ),
    [normalizedQuery, options],
  );

  const closeModal = () => {
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={isVisible}
      onRequestClose={closeModal}
    >
      <View className="flex-1 justify-end bg-black/40">
        <TouchableOpacity
          activeOpacity={1}
          className="flex-1"
          accessibilityRole="button"
          accessibilityLabel="Close category picker"
          onPress={closeModal}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}
        >
          <SafeAreaView
            edges={['bottom']}
            className="rounded-t-[28px] bg-white"
            style={{ height: '78%' }}
          >
            <View className="px-5 pt-5">
              <View className="mb-4 flex-row items-center justify-between">
                <ThemedText className="text-xl text-gray-900" weight="bold">
                  Categories
                </ThemedText>

                <TouchableOpacity
                  activeOpacity={0.75}
                  accessibilityRole="button"
                  accessibilityLabel="Close category picker"
                  onPress={closeModal}
                  className="h-10 w-10 items-center justify-center rounded-full bg-gray-100"
                >
                  <Ionicons name="close" size={22} color={themeColors.gray700} />
                </TouchableOpacity>
              </View>

              <View className="mb-3 flex-row items-center rounded-xl border border-gray-100 bg-gray-50 px-3 py-3">
                <Ionicons name="search" size={18} color={themeColors.gray500} />
                <TextInput
                  autoFocus
                  value={query}
                  onChangeText={onQueryChange}
                  placeholder="Search categories"
                  placeholderTextColor={themeColors.gray400}
                  className={`${typography.primaryControlSize} ml-2 flex-1 text-gray-800`}
                  style={{ fontFamily: fontFamilies.regular }}
                />
              </View>
            </View>

            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={filteredOptions.length > 6}
              contentContainerStyle={{ paddingBottom: 24, paddingHorizontal: 20 }}
            >
              {filteredOptions.map((option) => {
                const isSelected = option.id === selectedId;

                return (
                  <TouchableOpacity
                    key={option.id}
                    activeOpacity={0.78}
                    accessibilityRole="button"
                    onPress={() => {
                      onSelect(option.id);
                      closeModal();
                    }}
                    className={`mb-2 flex-row items-center rounded-2xl border px-4 py-4 ${
                      isSelected
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-100 bg-white'
                    }`}
                  >
                    <View className="h-11 w-11 items-center justify-center rounded-full bg-gray-100">
                      <Ionicons
                        name={option.iconName ?? 'pricetag'}
                        size={20}
                        color={option.iconColor ?? themeColors.primary}
                      />
                    </View>

                    <ThemedText
                      className="ml-3 flex-1 text-base text-gray-900"
                      weight="semiBold"
                      numberOfLines={1}
                    >
                      {option.label}
                    </ThemedText>

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

              {filteredOptions.length === 0 ? (
                <View className="items-center px-3 py-8">
                  <ThemedText className="text-sm text-gray-500">
                    No categories found
                  </ThemedText>
                </View>
              ) : null}
            </ScrollView>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default CategoryPickerModal;
