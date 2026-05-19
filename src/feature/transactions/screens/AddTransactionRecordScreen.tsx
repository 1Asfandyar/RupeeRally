import { useRouter } from 'expo-router';

import useAddTransactionRecord from '@/feature/transactions/hooks/useAddTransactionRecord';
import type { AddTransactionRecordScreenProps } from '@/feature/transactions/types/addTransactionRecord.types';
import AddTransactionRecordView from '@/feature/transactions/views/AddTransactionRecordView';

const AddTransactionRecordScreen = ({
  recordKind,
}: AddTransactionRecordScreenProps) => {
  const router = useRouter();
  const form = useAddTransactionRecord(recordKind);
  const formWithNavigation = {
    ...form,
    cancel: () => router.back(),
  };

  return <AddTransactionRecordView form={formWithNavigation} />;
};

export default AddTransactionRecordScreen;
