import { Redirect } from 'expo-router';

import { ROUTES } from '@/config/routes';

const BudgetsScreen = () => <Redirect href={ROUTES.MAIN_HOME} />;

export default BudgetsScreen;
