import { Ionicons } from '@expo/vector-icons';

import type { Category } from '@/feature/categories/types/category.types';
import type { TransactionType } from '@/feature/transactions/types/transaction.types';
import type { Account } from '@/types/account.types';

export type AddTransactionRecordKind = 'personal' | 'shared';

export type AddTransactionRecordContent = {
  iconName: keyof typeof Ionicons.glyphMap;
  submitLabel: string;
  subtitle: string;
  title: string;
};

export type AddTransactionRecordFormField =
  | 'accountId'
  | 'amount'
  | 'categoryId'
  | 'note'
  | 'transactionType';

export type AddTransactionRecordFormValues = {
  accountId: string;
  amount: string;
  categoryId: string;
  note: string;
  transactionType: TransactionType;
};

export type AddTransactionRecordScreenProps = {
  recordKind: AddTransactionRecordKind;
};

export type AddTransactionRecordOpenDropdown = 'account' | null;

export type TransactionTypeTabConfig = {
  value: TransactionType;
  label: string;
  iconName: keyof typeof Ionicons.glyphMap;
};

export type TransactionTypeTabsProps = {
  selectedType: TransactionType;
  onSelectType: (type: TransactionType) => void;
};

export type AddTransactionRecordDropdownOption = {
  id: number;
  label: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  supportingLabel?: string;
};

export type SearchableDropdownProps = {
  error?: string;
  iconName: keyof typeof Ionicons.glyphMap;
  inlineLabel?: string;
  isOpen: boolean;
  isProminent?: boolean;
  label?: string;
  onBlur?: () => void;
  onClose: () => void;
  onOpen: () => void;
  onQueryChange: (query: string) => void;
  onSelect: (id: number) => void;
  options: AddTransactionRecordDropdownOption[];
  placeholder: string;
  query: string;
  selectedId: number | null;
};

export type CategoryPickerModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onQueryChange: (query: string) => void;
  onSelect: (id: number) => void;
  options: AddTransactionRecordDropdownOption[];
  query: string;
  selectedId: number | null;
};

export type AddTransactionRecordFormData = {
  accounts: Account[];
  categories: Category[];
};

export type AddTransactionRecordState = {
  accountDropdownQuery: string;
  accounts: Account[];
  categories: Category[];
  categoryPickerQuery: string;
  formError: string;
  isCategoryPickerVisible: boolean;
  isLoadingOptions: boolean;
  openDropdown: AddTransactionRecordOpenDropdown;
};

export type AddTransactionRecordActions = {
  closeCategoryPicker: () => void;
  closeDropdown: () => void;
  openAccountDropdown: () => void;
  openCategoryPicker: () => void;
  resetAddTransactionRecord: () => void;
  setAccountDropdownQuery: (query: string) => void;
  setAccounts: (accounts: Account[]) => void;
  setCategories: (categories: Category[]) => void;
  setCategoryPickerQuery: (query: string) => void;
  setFormError: (formError: string) => void;
  setIsLoadingOptions: (isLoadingOptions: boolean) => void;
};

export type AddTransactionRecordStore = AddTransactionRecordState &
  AddTransactionRecordActions;

export type AddTransactionRecordFieldErrors = Partial<
  Record<AddTransactionRecordFormField, string>
>;

export type AddTransactionRecordViewModel = {
  accountDropdownQuery: string;
  accountOptions: AddTransactionRecordDropdownOption[];
  cancel: () => void;
  categoryPickerQuery: string;
  categoryOptions: AddTransactionRecordDropdownOption[];
  closeCategoryPicker: () => void;
  closeDropdown: () => void;
  content: AddTransactionRecordContent;
  fieldErrors: AddTransactionRecordFieldErrors;
  formError: string;
  isCategoryPickerVisible: boolean;
  isLoadingOptions: boolean;
  isSaving: boolean;
  isSubmitDisabled: boolean;
  openAccountDropdown: () => void;
  openCategoryPicker: () => void;
  openDropdown: AddTransactionRecordOpenDropdown;
  selectAccount: (id: number) => void;
  selectCategory: (id: number) => void;
  selectedAccountId: number | null;
  selectedCategory?: AddTransactionRecordDropdownOption;
  selectedCategoryId: number | null;
  setAccountDropdownQuery: (query: string) => void;
  setCategoryPickerQuery: (query: string) => void;
  submit: () => void;
  updateField: (
    field: keyof AddTransactionRecordFormValues,
    value: string,
  ) => void;
  updateTransactionType: (transactionType: TransactionType) => void;
  validateField: (field: keyof AddTransactionRecordFormValues) => void;
  values: AddTransactionRecordFormValues;
};

export type AddTransactionRecordViewProps = {
  form: AddTransactionRecordViewModel;
};

export type { Category, TransactionType };
