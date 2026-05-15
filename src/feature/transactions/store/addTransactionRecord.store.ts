import { create } from 'zustand';

import type {
  AddTransactionRecordState,
  AddTransactionRecordStore,
} from '@/feature/transactions/types/addTransactionRecord.types';

const initialAddTransactionRecordState: AddTransactionRecordState = {
  accountDropdownQuery: '',
  accounts: [],
  categories: [],
  categoryPickerQuery: '',
  formError: '',
  isCategoryPickerVisible: false,
  isLoadingOptions: true,
  openDropdown: null,
};

export const useAddTransactionRecordStore =
  create<AddTransactionRecordStore>((set) => ({
    ...initialAddTransactionRecordState,
    closeCategoryPicker: () =>
      set({ categoryPickerQuery: '', isCategoryPickerVisible: false }),
    closeDropdown: () => set({ accountDropdownQuery: '', openDropdown: null }),
    openAccountDropdown: () => set({ openDropdown: 'account' }),
    openCategoryPicker: () =>
      set({
        accountDropdownQuery: '',
        categoryPickerQuery: '',
        isCategoryPickerVisible: true,
        openDropdown: null,
      }),
    resetAddTransactionRecord: () => set(initialAddTransactionRecordState),
    setAccountDropdownQuery: (accountDropdownQuery) =>
      set({ accountDropdownQuery }),
    setAccounts: (accounts) => set({ accounts }),
    setCategories: (categories) => set({ categories }),
    setCategoryPickerQuery: (categoryPickerQuery) =>
      set({ categoryPickerQuery }),
    setFormError: (formError) => set({ formError }),
    setIsLoadingOptions: (isLoadingOptions) => set({ isLoadingOptions }),
  }));
