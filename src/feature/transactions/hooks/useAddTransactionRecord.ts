import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useFormik } from 'formik';
import type { FormikErrors } from 'formik';
import { useCallback, useEffect, useMemo } from 'react';

import {
  addTransactionRecordContent,
  addTransactionRecordInitialValues,
} from '@/feature/transactions/constants/addTransactionRecord.constants';
import { listAccounts } from '@/feature/accounts/api/accounts.api';
import { listCategories } from '@/feature/categories/api/categories.api';
import { useAddTransactionRecordStore } from '@/feature/transactions/store/addTransactionRecord.store';
import { createTransaction } from '@/feature/transactions/api/transactions.api';
import type {
  AddTransactionRecordDropdownOption,
  AddTransactionRecordFormValues,
  AddTransactionRecordKind,
  AddTransactionRecordViewModel,
} from '@/feature/transactions/types/addTransactionRecord.types';
import type { TransactionType } from '@/feature/transactions/types/transaction.types';
import { ApiError } from '@/services/api';
import { useAuthStore } from '@/store/auth.store';
import { formatCents } from '@/utils/currency';

const CATEGORY_ICON_FALLBACK: keyof typeof Ionicons.glyphMap = 'pricetag-outline';

const toCents = (amount: string) => Math.round(Number(amount) * 100);

const getCategoryIcon = (icon: string | null): keyof typeof Ionicons.glyphMap =>
  icon && icon in Ionicons.glyphMap
    ? (icon as keyof typeof Ionicons.glyphMap)
    : CATEGORY_ICON_FALLBACK;

const validateAddTransactionRecord = (
  values: AddTransactionRecordFormValues,
) => {
  const errors: FormikErrors<AddTransactionRecordFormValues> = {};
  const amount = Number(values.amount);

  if (!values.amount.trim()) {
    errors.amount = 'Amount is required.';
  } else if (!Number.isFinite(amount) || amount <= 0) {
    errors.amount = 'Enter a valid amount.';
  }

  if (!values.accountId) {
    errors.accountId = 'Choose an account.';
  }

  if (!values.categoryId) {
    errors.categoryId = 'Choose a category.';
  }

  return errors;
};

const useAddTransactionRecord = (
  recordKind: AddTransactionRecordKind,
): AddTransactionRecordViewModel => {
  const router = useRouter();
  const params = useLocalSearchParams<{ accountId?: string }>();
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const {
    accountDropdownQuery,
    accounts,
    categories,
    categoryPickerQuery,
    closeCategoryPicker,
    closeDropdown,
    formError,
    isCategoryPickerVisible,
    isLoadingOptions,
    openAccountDropdown,
    openCategoryPicker,
    openDropdown,
    resetAddTransactionRecord,
    setAccountDropdownQuery,
    setAccounts,
    setCategories,
    setCategoryPickerQuery,
    setFormError,
    setIsLoadingOptions,
  } = useAddTransactionRecordStore();
  const content = addTransactionRecordContent[recordKind];

  const activeAccounts = useMemo(
    () => accounts.filter((account) => !account.is_archived),
    [accounts],
  );

  const formik = useFormik<AddTransactionRecordFormValues>({
    initialValues: addTransactionRecordInitialValues,
    validate: validateAddTransactionRecord,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (formValues, helpers) => {
      if (!token) {
        setFormError('Please sign in again to save this record.');
        return;
      }

      const selectedAccount = activeAccounts.find(
        (account) => account.id === Number(formValues.accountId),
      );
      const selectedCategory = categories.find(
        (category) => category.id === Number(formValues.categoryId),
      );

      if (!selectedAccount) {
        helpers.setFieldError('accountId', 'Choose an account.');
        return;
      }

      setFormError('');

      try {
        await createTransaction(token, {
          title:
            formValues.note.trim() ||
            selectedCategory?.name ||
            'Personal record',
          transaction_type: formValues.transactionType,
          amount_cents: toCents(formValues.amount),
          account_id: selectedAccount.id,
          category_id: Number(formValues.categoryId),
          transaction_date: new Date().toISOString(),
          note: formValues.note.trim(),
          currency_id: selectedAccount.currency_id ?? user?.currency_id ?? 1,
        });

        router.back();
      } catch (error) {
        if (error instanceof ApiError) {
          setFormError(error.fieldErrors.base || error.message);
          helpers.setErrors({
            amount: error.fieldErrors.amount_cents,
            accountId: error.fieldErrors.account_id,
            categoryId: error.fieldErrors.category_id,
            note: error.fieldErrors.note,
          });
          return;
        }

        setFormError('Could not save this record. Please try again.');
      }
    },
  });

  const {
    errors,
    handleSubmit,
    isSubmitting,
    setFieldError,
    setFieldTouched,
    setFieldValue,
    validateField: runFieldValidation,
    values,
  } = formik;

  useEffect(() => {
    resetAddTransactionRecord();

    return resetAddTransactionRecord;
  }, [resetAddTransactionRecord]);

  const loadOptions = useCallback(async () => {
    if (!token) {
      setIsLoadingOptions(false);
      return;
    }

    setIsLoadingOptions(true);
    setFormError('');

    try {
      const [nextAccounts, nextCategories] = await Promise.all([
        listAccounts(token),
        listCategories(token),
      ]);

      setAccounts(nextAccounts);
      setCategories(nextCategories);
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : 'Could not load form options.',
      );
    } finally {
      setIsLoadingOptions(false);
    }
  }, [
    setAccounts,
    setCategories,
    setFormError,
    setIsLoadingOptions,
    token,
  ]);

  useEffect(() => {
    void loadOptions();
  }, [loadOptions]);

  useEffect(() => {
    if (!values.accountId && activeAccounts.length > 0) {
      const routeAccount = activeAccounts.find(
        (account) => account.id === Number(params.accountId),
      );

      void setFieldValue(
        'accountId',
        String(routeAccount?.id ?? activeAccounts[0].id),
        false,
      );
    }
  }, [activeAccounts, params.accountId, setFieldValue, values.accountId]);

  const filteredCategories = useMemo(
    () =>
      categories.filter(
        (category) => category.category_type === values.transactionType,
      ),
    [categories, values.transactionType],
  );

  useEffect(() => {
    if (
      values.categoryId &&
      !filteredCategories.some(
        (category) => category.id === Number(values.categoryId),
      )
    ) {
      void setFieldValue('categoryId', '', false);
    }
  }, [filteredCategories, setFieldValue, values.categoryId]);

  const accountOptions: AddTransactionRecordDropdownOption[] = useMemo(
    () =>
      activeAccounts.map((account) => ({
        id: account.id,
        label: account.name,
        iconName: 'wallet-outline',
        supportingLabel: formatCents(
          account.current_balance_cents,
          account.currency_id,
        ),
      })),
    [activeAccounts],
  );

  const categoryOptions: AddTransactionRecordDropdownOption[] = useMemo(
    () =>
      filteredCategories.map((category) => ({
        id: category.id,
        label: category.name,
        iconName: getCategoryIcon(category.icon),
        iconColor: category.color ?? undefined,
      })),
    [filteredCategories],
  );

  const selectedAccountId = values.accountId ? Number(values.accountId) : null;
  const selectedCategoryId = values.categoryId ? Number(values.categoryId) : null;
  const selectedCategory = useMemo(
    () =>
      categoryOptions.find((category) => category.id === selectedCategoryId),
    [categoryOptions, selectedCategoryId],
  );

  const updateField = useCallback(
    (field: keyof AddTransactionRecordFormValues, value: string) => {
      void setFieldValue(field, value, false);
      setFieldError(field, undefined);
      setFormError('');
    },
    [setFieldError, setFieldValue, setFormError],
  );

  const selectAccount = useCallback(
    (accountId: number) => {
      updateField('accountId', String(accountId));
    },
    [updateField],
  );

  const selectCategory = useCallback(
    (categoryId: number) => {
      updateField('categoryId', String(categoryId));
    },
    [updateField],
  );

  const updateTransactionType = useCallback(
    (transactionType: TransactionType) => {
      void setFieldValue('transactionType', transactionType, false);
      void setFieldValue('categoryId', '', false);
      setFieldError('categoryId', undefined);
      setFormError('');
    },
    [setFieldError, setFieldValue, setFormError],
  );

  const validateField = useCallback(
    (field: keyof AddTransactionRecordFormValues) => {
      void setFieldTouched(field, true, false);
      void runFieldValidation(field);
    },
    [runFieldValidation, setFieldTouched],
  );

  const submit = useCallback(() => {
    handleSubmit();
  }, [handleSubmit]);

  const cancel = useCallback(() => {
    router.back();
  }, [router]);

  return {
    accountDropdownQuery,
    accountOptions,
    cancel,
    categoryPickerQuery,
    categoryOptions,
    closeCategoryPicker,
    closeDropdown,
    content,
    fieldErrors: errors,
    formError,
    isCategoryPickerVisible,
    isLoadingOptions,
    isSaving: isSubmitting,
    isSubmitDisabled: isLoadingOptions || isSubmitting,
    openAccountDropdown,
    openCategoryPicker,
    openDropdown,
    selectAccount,
    selectCategory,
    selectedAccountId,
    selectedCategory,
    selectedCategoryId,
    setAccountDropdownQuery,
    setCategoryPickerQuery,
    submit,
    updateField,
    updateTransactionType,
    validateField,
    values,
  };
};

export default useAddTransactionRecord;
