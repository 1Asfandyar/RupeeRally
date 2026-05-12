import { Redirect, Slot } from 'expo-router';

import { ROUTES } from '@/config/routes';
import { useAuthStore } from '@/store/auth.store';

export default function AuthLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Redirect href={ROUTES.MAIN_DASHBOARD} />;
  }

  return <Slot />;
}
