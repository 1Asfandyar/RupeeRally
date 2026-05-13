import { Redirect, Slot } from 'expo-router';

import { ROUTES } from '@/config/routes';
import { useAuthStore } from '@/store/auth.store';

export default function OnboardingLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hasCompletedOnboarding = useAuthStore(
    (state) => state.hasCompletedOnboarding,
  );

  if (!isAuthenticated) {
    return <Redirect href={ROUTES.AUTH_LOGIN} />;
  }

  if (hasCompletedOnboarding) {
    return <Redirect href={ROUTES.MAIN_HOME} />;
  }

  return <Slot />;
}
