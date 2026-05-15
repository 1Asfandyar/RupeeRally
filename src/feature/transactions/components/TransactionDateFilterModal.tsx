import useTransactionDateFilterModal from '@/feature/transactions/hooks/useTransactionDateFilterModal';
import type { TransactionDateFilterModalProps } from '@/feature/transactions/types/transactionDateFilter.types';
import TransactionDateFilterModalView from '@/feature/transactions/views/TransactionDateFilterModalView';

const TransactionDateFilterModal = (
  props: TransactionDateFilterModalProps,
) => {
  const viewModel = useTransactionDateFilterModal(props);

  return (
    <TransactionDateFilterModalView
      {...viewModel}
      isVisible={props.isVisible}
      onClose={props.onClose}
    />
  );
};

export default TransactionDateFilterModal;
