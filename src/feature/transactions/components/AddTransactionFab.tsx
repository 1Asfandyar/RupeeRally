import AddTransactionFabView from '@/feature/transactions/components/AddTransactionFabView';
import useAddTransactionFab from '@/feature/transactions/hooks/useAddTransactionFab';
import type { AddTransactionFabProps } from '@/feature/transactions/types/addTransactionFab.types';

const AddTransactionFab = ({ selectedAccountId }: AddTransactionFabProps) => {
  const viewModel = useAddTransactionFab(selectedAccountId);

  return <AddTransactionFabView {...viewModel} />;
};

export default AddTransactionFab;
