import { Ionicons } from '@expo/vector-icons';
import { ScrollView, View } from 'react-native';

import useAddTransactionRecord from '@/feature/accounts/hooks/useAddTransactionRecord';
import { AddTransactionRecordScreenProps } from '@/feature/accounts/types/addTransactionRecord.types';
import ThemedButton from '@/theme/components/ThemedButton';
import ThemedInput from '@/theme/components/ThemedInput';
import ThemedText from '@/theme/components/ThemedText';
import { themeColors } from '@/theme/utilities';

const AddTransactionRecordScreen = ({
  recordKind,
}: AddTransactionRecordScreenProps) => {
  const form = useAddTransactionRecord(recordKind);

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 32,
        paddingHorizontal: 20,
        paddingTop: 24,
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

      <View className="rounded-3xl border border-gray-100 bg-gray-50 px-4 py-5">
        <ThemedInput
          label="Amount"
          leftIcon="cash-outline"
          value={form.values.amount}
          onChangeText={(value) => form.updateField('amount', value)}
          placeholder="0.00"
          keyboardType="decimal-pad"
          returnKeyType="next"
          containerClassName="mb-4"
          borderClassName="border-gray-100"
        />

        <ThemedInput
          label="Title"
          leftIcon="receipt-outline"
          value={form.values.recordTitle}
          onChangeText={(value) => form.updateField('recordTitle', value)}
          placeholder="Dinner, groceries, fuel..."
          returnKeyType="next"
          containerClassName="mb-4"
          borderClassName="border-gray-100"
        />

        <ThemedInput
          label="Note"
          leftIcon="create-outline"
          value={form.values.note}
          onChangeText={(value) => form.updateField('note', value)}
          placeholder="Optional details"
          multiline
          textAlignVertical="top"
          inputClassName="min-h-20"
          borderClassName="items-start border-gray-100"
        />
      </View>

      <View className="mt-auto pt-8">
        <ThemedButton
          title={form.content.submitLabel}
          leftIcon="checkmark-circle-outline"
          onPress={form.submit}
          disabled={form.isSubmitDisabled}
        />
        <ThemedButton
          title="Cancel"
          variant="ghost"
          onPress={form.cancel}
          containerClassName="mt-3"
        />
      </View>
    </ScrollView>
  );
};

export default AddTransactionRecordScreen;
