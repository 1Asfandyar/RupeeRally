import {
  AddTransactionRecordContent,
  AddTransactionRecordFormValues,
  AddTransactionRecordKind,
} from '@/feature/accounts/types/addTransactionRecord.types';

export const addTransactionRecordInitialValues: AddTransactionRecordFormValues = {
  amount: '',
  note: '',
  recordTitle: '',
};

export const addTransactionRecordContent: Record<
  AddTransactionRecordKind,
  AddTransactionRecordContent
> = {
  personal: {
    iconName: 'person-outline',
    submitLabel: 'Save personal record',
    subtitle: 'Track money movement for your own account.',
    title: 'Add personal record',
  },
  shared: {
    iconName: 'people-outline',
    submitLabel: 'Save shared record',
    subtitle: 'Track an expense that belongs to a group or shared balance.',
    title: 'Add shared record',
  },
};
