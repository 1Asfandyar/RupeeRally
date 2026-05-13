import { Redirect } from 'expo-router';
import { useAuthStore } from '@/store/auth.store';
import { ROUTES } from '@/config/routes';

export default function Home() {
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
}
