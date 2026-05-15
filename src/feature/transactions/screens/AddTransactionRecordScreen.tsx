import useAddTransactionRecord from '@/feature/transactions/hooks/useAddTransactionRecord';
import type { AddTransactionRecordScreenProps } from '@/feature/transactions/types/addTransactionRecord.types';
import AddTransactionRecordView from '@/feature/transactions/views/AddTransactionRecordView';

const AddTransactionRecordScreen = ({
  recordKind,
}: AddTransactionRecordScreenProps) => {
  const form = useAddTransactionRecord(recordKind);

  return <AddTransactionRecordView form={form} />;
};

export default AddTransactionRecordScreen;
