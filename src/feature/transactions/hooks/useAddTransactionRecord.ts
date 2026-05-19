import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useFormik } from 'formik';
import type { FormikErrors } from 'formik';
import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  addTransactionRecordContent,
  addTransactionRecordInitialValues,
} from '@/feature/transactions/constants/addTransactionRecord.constants';
import { sharedExpenseSplitMethodLabels } from '@/feature/transactions/constants/sharedExpenseSplit.constants';
import { listAccounts } from '@/feature/accounts/api/accounts.api';
import { listCategories } from '@/feature/categories/api/categories.api';
import { listGroups } from '@/feature/groups/api/groups.api';
import type { Group, GroupUser } from '@/feature/groups/types/group.types';
import { getGroupUsers } from '@/feature/groups/utils/groupMembers.utils';
import { useAddTransactionRecordStore } from '@/feature/transactions/store/addTransactionRecord.store';
import { createTransaction } from '@/feature/transactions/api/transactions.api';
import useSharedExpenseFriends from '@/feature/transactions/hooks/useSharedExpenseFriends';
import type {
  AddTransactionRecordDropdownOption,
  AddTransactionRecordFieldErrors,
  AddTransactionRecordFormValues,
  AddTransactionRecordKind,
  AddTransactionRecordTextField,
  AddTransactionRecordViewModel,
} from '@/feature/transactions/types/addTransactionRecord.types';
import type { SharedExpenseSplitMethod } from '@/feature/transactions/types/sharedExpenseSplit.types';
import type {
  TransactionPayload,
  TransactionType,
} from '@/feature/transactions/types/transaction.types';
import {
  areSplitValueMapsEqual,
  buildSharedExpenseUserShares,
  getDefaultSharedExpenseSplitValues,
  getSharedExpenseSplitParticipantIds,
  reconcileSharedExpenseSplitValues,
  sanitizeSharedExpenseSplitInput,
  validateSharedExpenseSplitValues,
} from '@/feature/transactions/utils/sharedExpenseSplit.utils';
import { ApiError } from '@/services/api';
import { useAuthStore } from '@/store/auth.store';
import { formatCents, moneyInputToCents } from '@/utils/currency';

const CATEGORY_ICON_FALLBACK: keyof typeof Ionicons.glyphMap = 'pricetag-outline';

const toCents = (amount: string) => moneyInputToCents(amount);

const getCategoryIcon = (icon: string | null): keyof typeof Ionicons.glyphMap =>
  icon && icon in Ionicons.glyphMap
    ? (icon as keyof typeof Ionicons.glyphMap)
    : CATEGORY_ICON_FALLBACK;

const getValidatedFieldErrors = (
  errors: FormikErrors<AddTransactionRecordFormValues>,
): AddTransactionRecordFieldErrors => ({
  accountId: typeof errors.accountId === 'string' ? errors.accountId : undefined,
  amount: typeof errors.amount === 'string' ? errors.amount : undefined,
  categoryId:
    typeof errors.categoryId === 'string' ? errors.categoryId : undefined,
  note: typeof errors.note === 'string' ? errors.note : undefined,
  sharedUserIds:
    typeof errors.sharedUserIds === 'string'
      ? errors.sharedUserIds
      : undefined,
  transactionType:
    typeof errors.transactionType === 'string'
      ? errors.transactionType
      : undefined,
});

const validateAddTransactionRecord =
  (recordKind: AddTransactionRecordKind) =>
  (values: AddTransactionRecordFormValues) => {
    const errors: FormikErrors<AddTransactionRecordFormValues> = {};
    const amountCents = moneyInputToCents(values.amount);

    if (!values.amount.trim()) {
      errors.amount = 'Amount is required.';
    } else if (amountCents <= 0) {
      errors.amount = 'Enter a valid amount.';
    }

    if (!values.accountId) {
      errors.accountId = 'Choose an account.';
    }

    if (!values.categoryId) {
      errors.categoryId = 'Choose a category.';
    }

    if (recordKind === 'shared' && values.sharedUserIds.length === 0) {
      errors.sharedUserIds = 'Choose at least one friend to share with.';
    }

    return errors;
  };

const useAddTransactionRecord = (
  recordKind: AddTransactionRecordKind,
): Omit<AddTransactionRecordViewModel, 'cancel'> => {
  const params = useLocalSearchParams<{ accountId?: string }>();
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const accountDropdownQuery = useAddTransactionRecordStore(
    (state) => state.accountDropdownQuery,
  );
  const accounts = useAddTransactionRecordStore((state) => state.accounts);
  const categories = useAddTransactionRecordStore((state) => state.categories);
  const categoryPickerQuery = useAddTransactionRecordStore(
    (state) => state.categoryPickerQuery,
  );
  const closeCategoryPicker = useAddTransactionRecordStore(
    (state) => state.closeCategoryPicker,
  );
  const closeDropdown = useAddTransactionRecordStore(
    (state) => state.closeDropdown,
  );
  const formError = useAddTransactionRecordStore((state) => state.formError);
  const isCategoryPickerVisible = useAddTransactionRecordStore(
    (state) => state.isCategoryPickerVisible,
  );
  const isLoadingOptions = useAddTransactionRecordStore(
    (state) => state.isLoadingOptions,
  );
  const openAccountDropdown = useAddTransactionRecordStore(
    (state) => state.openAccountDropdown,
  );
  const openCategoryPicker = useAddTransactionRecordStore(
    (state) => state.openCategoryPicker,
  );
  const openDropdown = useAddTransactionRecordStore(
    (state) => state.openDropdown,
  );
  const resetAddTransactionRecord = useAddTransactionRecordStore(
    (state) => state.resetAddTransactionRecord,
  );
  const setAccountDropdownQuery = useAddTransactionRecordStore(
    (state) => state.setAccountDropdownQuery,
  );
  const setAccounts = useAddTransactionRecordStore((state) => state.setAccounts);
  const setCategories = useAddTransactionRecordStore(
    (state) => state.setCategories,
  );
  const setCategoryPickerQuery = useAddTransactionRecordStore(
    (state) => state.setCategoryPickerQuery,
  );
  const setFormError = useAddTransactionRecordStore(
    (state) => state.setFormError,
  );
  const setIsLoadingOptions = useAddTransactionRecordStore(
    (state) => state.setIsLoadingOptions,
  );
  const content = addTransactionRecordContent[recordKind];
  const isSharedRecord = recordKind === 'shared';
  const [friendPickerQuery, setFriendPickerQuery] = useState('');
  const [isSplitSheetVisible, setIsSplitSheetVisible] = useState(false);
  const [sharedGroups, setSharedGroups] = useState<Group[]>([]);
  const [splitValuesError, setSplitValuesError] = useState('');

  const activeAccounts = useMemo(
    () => accounts.filter((account) => !account.is_archived),
    [accounts],
  );

  const formik = useFormik<AddTransactionRecordFormValues>({
    initialValues: addTransactionRecordInitialValues,
    validate: validateAddTransactionRecord(recordKind),
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (formValues, helpers) => {
      if (!token) {
        setFormError('Please sign in again to save this record.');
        return;
      }

      if (isSharedRecord && !user?.id) {
        setFormError('Please sign in again to save this shared expense.');
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

      const totalAmountCents = toCents(formValues.amount);
      const sharedParticipantIds =
        isSharedRecord && user?.id
          ? getSharedExpenseSplitParticipantIds(user.id, formValues.sharedUserIds)
          : [];

      if (isSharedRecord) {
        const nextSplitValuesError = validateSharedExpenseSplitValues({
          method: formValues.splitMethod,
          participantIds: sharedParticipantIds,
          totalAmountCents,
          values: formValues.splitValues,
        });

        if (nextSplitValuesError) {
          setSplitValuesError(nextSplitValuesError);
          return;
        }
      }

      setFormError('');
      setSplitValuesError('');

      try {
        const transactionType = isSharedRecord
          ? 'expense'
          : formValues.transactionType;
        const payload: TransactionPayload = {
          title:
            formValues.note.trim() ||
            selectedCategory?.name ||
            (isSharedRecord ? 'Shared expense' : 'Personal record'),
          transaction_type: transactionType,
          amount_cents: totalAmountCents,
          account_id: selectedAccount.id,
          category_id: Number(formValues.categoryId),
          transaction_date: new Date().toISOString(),
          note: formValues.note.trim(),
          currency_id: selectedAccount.currency_id ?? user?.currency_id ?? 1,
        };

        if (isSharedRecord && user?.id) {
          payload.paid_by = user.id;
          payload.shared_by = sharedParticipantIds;
          payload.split_method = formValues.splitMethod;
          payload.user_shares = buildSharedExpenseUserShares({
            method: formValues.splitMethod,
            participantIds: sharedParticipantIds,
            values: formValues.splitValues,
          });
        }

        await createTransaction(token, payload);
      } catch (error) {
        if (error instanceof ApiError) {
          setFormError(error.fieldErrors.base || error.message);
          setSplitValuesError(
            error.fieldErrors.user_shares || error.fieldErrors.split_method || '',
          );
          helpers.setErrors({
            amount: error.fieldErrors.amount_cents,
            accountId: error.fieldErrors.account_id,
            categoryId: error.fieldErrors.category_id,
            note: error.fieldErrors.note,
            sharedUserIds:
              error.fieldErrors.shared_by || error.fieldErrors.user_shares,
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
    setValues,
    validateField: runFieldValidation,
    values,
  } = formik;
  const fieldErrors = useMemo(
    () => ({
      ...getValidatedFieldErrors(errors),
      splitValues: splitValuesError || undefined,
    }),
    [errors, splitValuesError],
  );
  const setFormFieldValue = useCallback(
    <Field extends keyof AddTransactionRecordFormValues>(
      field: Field,
      value: AddTransactionRecordFormValues[Field],
      shouldValidate = false,
    ) => {
      void setFieldValue(field, value, shouldValidate).catch(() => undefined);
    },
    [setFieldValue],
  );

  const updateSharedUserIds = useCallback(
    (userIds: number[]) => {
      setFormFieldValue('sharedUserIds', userIds);
      setFieldError('sharedUserIds', undefined);
      setFormError('');
      setSplitValuesError('');
    },
    [setFieldError, setFormError, setFormFieldValue],
  );

  const sharedFriends = useSharedExpenseFriends({
    currentUserId: user?.id,
    onSelectionChange: updateSharedUserIds,
    selectedUserIds: values.sharedUserIds,
    token,
  });
  const { loadFriendsGroup, toggleSharedUser: toggleSharedFriendUser } =
    sharedFriends;
  const currentUserParticipant = useMemo<GroupUser | null>(() => {
    if (!user?.id) {
      return null;
    }

    return {
      avatar_url: user.avatar_url,
      email: user.email,
      full_name: user.full_name || 'You',
      id: user.id,
      mobile_number: user.mobile_number,
      photo_url: user.photo_url,
      profile_image_url: user.profile_image_url,
      profile_photo_url: user.profile_photo_url,
    };
  }, [user]);
  const sharedUsersById = useMemo(() => {
    const usersById = new Map<number, GroupUser>();

    sharedFriends.friends.forEach((friend) => {
      usersById.set(friend.id, friend);
    });

    sharedGroups.forEach((group) => {
      getGroupUsers(group, user?.id).forEach((member) => {
        usersById.set(member.id, member);
      });
    });

    return usersById;
  }, [sharedFriends.friends, sharedGroups, user?.id]);
  const selectedSharedFriends = useMemo(
    () =>
      values.sharedUserIds
        .map((userId) => sharedUsersById.get(userId))
        .filter((friend): friend is GroupUser => Boolean(friend)),
    [sharedUsersById, values.sharedUserIds],
  );
  const splitParticipants = useMemo(
    () =>
      currentUserParticipant
        ? [currentUserParticipant, ...selectedSharedFriends]
        : selectedSharedFriends,
    [currentUserParticipant, selectedSharedFriends],
  );
  const splitParticipantIds = useMemo(
    () => splitParticipants.map((participant) => participant.id),
    [splitParticipants],
  );

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
      const [nextAccounts, nextCategories, nextSharedGroups] = await Promise.all([
        listAccounts(token),
        listCategories(token),
        isSharedRecord ? listGroups(token, 'custom') : Promise.resolve([]),
        isSharedRecord ? loadFriendsGroup() : Promise.resolve(),
      ]);

      setAccounts(nextAccounts);
      setCategories(nextCategories);
      setSharedGroups(nextSharedGroups);
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
    isSharedRecord,
    loadFriendsGroup,
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

      setFormFieldValue(
        'accountId',
        String(routeAccount?.id ?? activeAccounts[0].id),
      );
    }
  }, [activeAccounts, params.accountId, setFormFieldValue, values.accountId]);

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
      setFormFieldValue('categoryId', '');
    }
  }, [filteredCategories, setFormFieldValue, values.categoryId]);

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
  const selectedAccount = useMemo(
    () => activeAccounts.find((account) => account.id === selectedAccountId),
    [activeAccounts, selectedAccountId],
  );
  const selectedAccountCurrencyId =
    selectedAccount?.currency_id ?? user?.currency_id ?? 1;
  const selectedCategoryId = values.categoryId ? Number(values.categoryId) : null;
  const selectedCategory = useMemo(
    () =>
      categoryOptions.find((category) => category.id === selectedCategoryId),
    [categoryOptions, selectedCategoryId],
  );
  const totalAmountCents = toCents(values.amount);
  const splitMethodLabel = sharedExpenseSplitMethodLabels[values.splitMethod];

  useEffect(() => {
    if (!isSharedRecord || values.splitMethod === 'equal') {
      return;
    }

    const nextSplitValues = reconcileSharedExpenseSplitValues(
      values.splitValues,
      values.splitMethod,
      splitParticipantIds,
      totalAmountCents,
    );

    if (!areSplitValueMapsEqual(nextSplitValues, values.splitValues)) {
      setFormFieldValue('splitValues', nextSplitValues);
    }
  }, [
    isSharedRecord,
    setFormFieldValue,
    splitParticipantIds,
    totalAmountCents,
    values.splitMethod,
    values.splitValues,
  ]);

  const updateField = useCallback(
    (field: AddTransactionRecordTextField, value: string) => {
      setFormFieldValue(field, value);
      setFieldError(field, undefined);
      setFormError('');
      if (field === 'amount') {
        setSplitValuesError('');
      }
    },
    [setFieldError, setFormError, setFormFieldValue],
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

  const updateSplitMethod = useCallback(
    (splitMethod: SharedExpenseSplitMethod) => {
      void setValues(
        (currentValues) => ({
          ...currentValues,
          splitMethod,
          splitValues: getDefaultSharedExpenseSplitValues(
            splitMethod,
            splitParticipantIds,
            totalAmountCents,
          ),
        }),
        false,
      ).catch(() => undefined);
      setSplitValuesError('');
      setFormError('');
    },
    [setFormError, setValues, splitParticipantIds, totalAmountCents],
  );

  const updateSplitValue = useCallback(
    (userId: number, value: string) => {
      const nextValue = sanitizeSharedExpenseSplitInput(
        values.splitMethod,
        value,
      );

      setFormFieldValue(
        'splitValues',
        {
          ...values.splitValues,
          [String(userId)]: nextValue,
        },
      );
      setSplitValuesError('');
      setFormError('');
    },
    [setFormError, setFormFieldValue, values.splitMethod, values.splitValues],
  );

  const updateTransactionType = useCallback(
    (transactionType: TransactionType) => {
      setFormFieldValue('transactionType', transactionType);
      setFormFieldValue('categoryId', '');
      setFieldError('categoryId', undefined);
      setFormError('');
    },
    [setFieldError, setFormError, setFormFieldValue],
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

  const openSplitSheet = useCallback(() => {
    setIsSplitSheetVisible(true);
  }, []);

  const closeSplitSheet = useCallback(() => {
    setIsSplitSheetVisible(false);
  }, []);

  const toggleSharedUser = useCallback(
    (userId: number) => {
      toggleSharedFriendUser(userId);
      setFriendPickerQuery('');
    },
    [toggleSharedFriendUser],
  );

  const toggleSharedGroup = useCallback(
    (group: Group) => {
      const groupUserIds = getGroupUsers(group, user?.id).map(
        (member) => member.id,
      );

      if (groupUserIds.length === 0) {
        return;
      }

      const isGroupSelected = groupUserIds.every((userId) =>
        values.sharedUserIds.includes(userId),
      );
      const nextSharedUserIds = isGroupSelected
        ? values.sharedUserIds.filter((userId) => !groupUserIds.includes(userId))
        : Array.from(new Set([...values.sharedUserIds, ...groupUserIds]));

      updateSharedUserIds(nextSharedUserIds);
      setFriendPickerQuery('');
    },
    [updateSharedUserIds, user?.id, values.sharedUserIds],
  );

  return {
    accountDropdownQuery,
    accountOptions,
    addFriend: sharedFriends.addFriend,
    categoryPickerQuery,
    categoryOptions,
    closeAddFriendModal: sharedFriends.closeAddFriendModal,
    closeCategoryPicker,
    closeDropdown,
    content,
    currentUserId: user?.id,
    fieldErrors,
    friendEmailQuery: sharedFriends.friendEmailQuery,
    friendSearchError: sharedFriends.friendSearchError,
    friendSearchResults: sharedFriends.friendSearchResults,
    friends: sharedFriends.friends,
    friendsGroupId: sharedFriends.friendsGroupId,
    formError,
    isAddFriendModalVisible: sharedFriends.isAddFriendModalVisible,
    isAddingFriend: sharedFriends.isAddingFriend,
    isCategoryPickerVisible,
    isLoadingOptions,
    isSaving: isSubmitting,
    isSearchingFriend: sharedFriends.isSearchingFriend,
    isSharedRecord,
    isSplitSheetVisible,
    isSubmitDisabled:
      isLoadingOptions ||
      isSubmitting ||
      sharedFriends.isAddingFriend ||
      (isSharedRecord && values.sharedUserIds.length === 0),
    closeSplitSheet,
    openAddFriendModal: sharedFriends.openAddFriendModal,
    openAccountDropdown,
    openCategoryPicker,
    openDropdown,
    openSplitSheet,
    searchFriendByEmail: sharedFriends.searchFriendByEmail,
    selectAccount,
    selectCategory,
    selectedAccountId,
    selectedAccountCurrencyId,
    selectedCategory,
    selectedCategoryId,
    selectedSharedFriends,
    selectedSharedUserIds: values.sharedUserIds,
    setFriendPickerQuery,
    setAccountDropdownQuery,
    setCategoryPickerQuery,
    setFriendEmailQuery: sharedFriends.setFriendEmailQuery,
    sharedGroups,
    splitMethodLabel,
    splitParticipants,
    friendPickerQuery,
    submit,
    toggleSharedGroup,
    toggleSharedUser,
    totalAmountCents,
    updateField,
    updateSplitMethod,
    updateSplitValue,
    updateTransactionType,
    validateField,
    values,
  };
};

export default useAddTransactionRecord;
