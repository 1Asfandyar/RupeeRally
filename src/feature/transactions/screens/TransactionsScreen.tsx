import { useTransactions } from '@/feature/transactions/hooks/useTransactions';
import TransactionsView from '@/feature/transactions/views/TransactionsView';

const TransactionsScreen = () => {
  const transactions = useTransactions();

  return <TransactionsView transactions={transactions} />;
};

export default TransactionsScreen;
