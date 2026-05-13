import { Redirect } from 'expo-router';

import { ROUTES } from '@/config/routes';
import { useAuthStore } from '@/store/auth.store';

const AuthGateScreen = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hasCompletedOnboarding = useAuthStore(
    (state) => state.hasCompletedOnboarding,
  );

  if (isAuthenticated) {
    return (
      <Redirect
        href={hasCompletedOnboarding ? ROUTES.MAIN_HOME : ROUTES.ONBOARDING}
      />
    );
  }

  return <Redirect href={ROUTES.AUTH_LOGIN} />;
};

export default AuthGateScreen;
