import AddTransactionFabView from '@/feature/accounts/components/AddTransactionFabView';
import useAddTransactionFab from '@/feature/accounts/hooks/useAddTransactionFab';

const AddTransactionFab = () => {
  const viewModel = useAddTransactionFab();

  return <AddTransactionFabView {...viewModel} />;
};

export default AddTransactionFab;
