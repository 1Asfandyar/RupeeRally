import { Ionicons } from '@expo/vector-icons';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CategoryPickerModal from '@/feature/categories/components/CategoryPickerModal';
import SearchableDropdown from '@/feature/transactions/components/SearchableDropdown';
import TransactionTypeTabs from '@/feature/transactions/components/TransactionTypeTabs';
import type { AddTransactionRecordViewProps } from '@/feature/transactions/types/addTransactionRecord.types';
import ThemedButton from '@/theme/components/ThemedButton';
import ThemedInput from '@/theme/components/ThemedInput';
import ThemedText from '@/theme/components/ThemedText';
import { themeColors } from '@/theme/utilities';

const AddTransactionRecordView = ({ form }: AddTransactionRecordViewProps) => {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingBottom: 28,
            paddingHorizontal: 20,
            paddingTop: 16,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="mb-6 flex-row items-start">
            <View className="h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
              <Ionicons
                name={form.content.iconName}
                size={22}
                color={themeColors.primary}
              />
            </View>

            <View className="ml-4 flex-1">
              <ThemedText className="text-2xl text-gray-900" weight="bold">
                {form.content.title}
              </ThemedText>
              <ThemedText className="mt-1 text-sm leading-5 text-gray-500">
                {form.content.subtitle}
              </ThemedText>
            </View>
          </View>

          <TransactionTypeTabs
            selectedType={form.values.transactionType}
            onSelectType={form.updateTransactionType}
          />

          {form.formError ? (
            <View className="mt-5 rounded-2xl bg-red-50 px-4 py-3">
              <ThemedText className="text-sm text-red-600">
                {form.formError}
              </ThemedText>
            </View>
          ) : null}

          {form.isLoadingOptions ? (
            <View className="mt-10 items-center justify-center py-8">
              <ActivityIndicator color={themeColors.primary} />
              <ThemedText className="mt-3 text-sm text-gray-500">
                Loading form options
              </ThemedText>
            </View>
          ) : (
            <View className="mt-6">
              <ThemedInput
                inlineLabel="Amount"
                inlineLabelIcon="cash"
                isProminent
                value={form.values.amount}
                onChangeText={(value) => form.updateField('amount', value)}
                onBlur={() => form.validateField('amount')}
                placeholder="0.00"
                keyboardType="decimal-pad"
                containerClassName="mb-4"
                error={form.fieldErrors.amount}
              />

              <SearchableDropdown
                inlineLabel="Account"
                iconName="wallet"
                isOpen={form.openDropdown === 'account'}
                isProminent
                options={form.accountOptions}
                query={form.accountDropdownQuery}
                selectedId={form.selectedAccountId}
                onOpen={form.openAccountDropdown}
                onClose={form.closeDropdown}
                onQueryChange={form.setAccountDropdownQuery}
                onSelect={form.selectAccount}
                onBlur={() => form.validateField('accountId')}
                placeholder="Choose account"
                error={form.fieldErrors.accountId}
              />

              <View className="mb-5">
                <TouchableOpacity
                  activeOpacity={0.8}
                  accessibilityRole="button"
                  onPress={form.openCategoryPicker}
                  className={`flex-row items-center rounded-xl border bg-white px-4 py-4 ${
                    form.fieldErrors.categoryId
                      ? 'border-red-400'
                      : 'border-gray-200'
                  }`}
                >
                  <Ionicons
                    name={form.selectedCategory?.iconName ?? 'pricetag'}
                    size={20}
                    color={form.selectedCategory?.iconColor ?? themeColors.primary}
                    style={{ marginRight: 8 }}
                  />
                  <ThemedText
                    className={`flex-1 ${
                      form.selectedCategory ? 'text-gray-800' : 'text-gray-400'
                    }`}
                    numberOfLines={1}
                  >
                    {form.selectedCategory?.label ?? 'Choose category'}
                  </ThemedText>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={themeColors.gray500}
                  />
                </TouchableOpacity>

                {form.fieldErrors.categoryId ? (
                  <ThemedText className="mt-1 text-xs text-red-500">
                    {form.fieldErrors.categoryId}
                  </ThemedText>
                ) : null}
              </View>

              <ThemedInput
                leftIcon="create-outline"
                value={form.values.note}
                onChangeText={(value) => form.updateField('note', value)}
                placeholder="Optional details"
                multiline
                textAlignVertical="top"
                inputClassName="min-h-20"
                borderClassName="items-start"
                error={form.fieldErrors.note}
              />
            </View>
          )}
        </ScrollView>

        <View className="flex-row items-center border-t border-gray-100 bg-white px-5 pb-3 pt-4">
          <ThemedButton
            title="Cancel"
            variant="outline"
            onPress={form.cancel}
            containerClassName="mr-3 flex-1"
          />
          <ThemedButton
            title={form.content.submitLabel}
            leftIcon="checkmark-circle-outline"
            onPress={form.submit}
            disabled={form.isSubmitDisabled}
            loading={form.isSaving}
            iconSize={16}
            textClassName="text-xs"
            style={{ flex: 1.35 }}
          />
        </View>

        <CategoryPickerModal
          isVisible={form.isCategoryPickerVisible}
          options={form.categoryOptions}
          query={form.categoryPickerQuery}
          selectedId={form.selectedCategoryId}
          onClose={form.closeCategoryPicker}
          onQueryChange={form.setCategoryPickerQuery}
          onSelect={form.selectCategory}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddTransactionRecordView;
