import { useRouter } from 'expo-router';
import { useState } from 'react';

import {
  addTransactionRecordContent,
  addTransactionRecordInitialValues,
} from '@/feature/accounts/constants/addTransactionRecord.constants';
import {
  AddTransactionRecordFormField,
  AddTransactionRecordKind,
} from '@/feature/accounts/types/addTransactionRecord.types';

const useAddTransactionRecord = (recordKind: AddTransactionRecordKind) => {
  const router = useRouter();
  const [values, setValues] = useState(addTransactionRecordInitialValues);
  const content = addTransactionRecordContent[recordKind];

  const updateField = (
    field: AddTransactionRecordFormField,
    value: string,
  ) => {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
  };

  const isSubmitDisabled =
    values.amount.trim().length === 0 ||
    values.recordTitle.trim().length === 0;

  const cancel = () => {
    router.back();
  };

  const submit = () => {
    if (isSubmitDisabled) {
      return;
    }

    router.back();
  };

  return {
    cancel,
    content,
    isSubmitDisabled,
    submit,
    updateField,
    values,
  };
};

export default useAddTransactionRecord;
