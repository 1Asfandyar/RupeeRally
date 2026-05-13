import { Redirect } from 'expo-router';

import { ROUTES } from '@/config/routes';

export default function TransactionsTab() {
  return <Redirect href={ROUTES.MAIN_HOME} />;
}
