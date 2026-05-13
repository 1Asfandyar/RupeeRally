import { ScrollView, View } from 'react-native';

import AccountPickerModal from '@/feature/accounts/components/AccountPickerModal';
import AddTransactionFab from '@/feature/accounts/components/AddTransactionFab';
import AccountsOverviewHeader from '@/feature/accounts/components/AccountsOverviewHeader';
import AccountsOverviewStatus from '@/feature/accounts/components/AccountsOverviewStatus';
import ExpenseOverviewTabs from '@/feature/accounts/components/ExpenseOverviewTabs';
import SelectedAccountBalanceCard from '@/feature/accounts/components/SelectedAccountBalanceCard';
import { useAccountsOverview } from '@/feature/accounts/hooks/useAccountsOverview';

const AccountsOverview = () => {
  const dashboard = useAccountsOverview();
  const hasAccounts = dashboard.activeAccounts.length > 0;

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1 bg-white"
        contentContainerStyle={{
          paddingBottom: 176,
          paddingHorizontal: 16,
          paddingTop: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        <AccountsOverviewHeader
          firstName={dashboard.userFirstName}
          onRefresh={dashboard.refreshAccounts}
        />

        <SelectedAccountBalanceCard
          currencies={dashboard.currencies}
          displayCurrency={dashboard.displayCurrency}
          selectedAccount={dashboard.selectedAccount}
          onChangeAccountPress={dashboard.openAccountPicker}
        />

        <AccountsOverviewStatus
          error={dashboard.error}
          hasAccounts={hasAccounts}
          isLoading={dashboard.isLoading}
          onRetry={dashboard.refreshAccounts}
        />

        <ExpenseOverviewTabs
          selectedTab={dashboard.selectedExpenseTab}
          onSelectTab={dashboard.setSelectedExpenseTab}
        />
      </ScrollView>

      <AddTransactionFab />

      <AccountPickerModal
        accounts={dashboard.activeAccounts}
        currencies={dashboard.currencies}
        isVisible={dashboard.isAccountPickerVisible}
        selectedAccount={dashboard.selectedAccount}
        onClose={dashboard.closeAccountPicker}
        onSelectAccount={dashboard.selectAccount}
      />
    </View>
  );
};

export default AccountsOverview;
