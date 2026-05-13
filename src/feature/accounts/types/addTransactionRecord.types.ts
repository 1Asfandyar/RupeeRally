import { Ionicons } from '@expo/vector-icons';

export type AddTransactionRecordKind = 'personal' | 'shared';

export type AddTransactionRecordContent = {
  iconName: keyof typeof Ionicons.glyphMap;
  submitLabel: string;
  subtitle: string;
  title: string;
};

export type AddTransactionRecordFormField =
  | 'amount'
  | 'note'
  | 'recordTitle';

export type AddTransactionRecordFormValues = Record<
  AddTransactionRecordFormField,
  string
>;

export type AddTransactionRecordScreenProps = {
  recordKind: AddTransactionRecordKind;
};
