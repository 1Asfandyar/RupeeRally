import { useAccountsOverview } from '@/feature/accounts/hooks/useAccountsOverview';
import AccountsOverviewView from '@/feature/accounts/views/AccountsOverviewView';

const AccountsOverviewScreen = () => {
  const dashboard = useAccountsOverview();

  return <AccountsOverviewView dashboard={dashboard} />;
};

export default AccountsOverviewScreen;
