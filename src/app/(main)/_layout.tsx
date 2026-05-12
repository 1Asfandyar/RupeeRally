import { Redirect, Slot } from 'expo-router';

import { ROUTES } from '@/config/routes';
import { useAuthStore } from '@/store/auth.store';

export default function MainLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Redirect href={ROUTES.AUTH_LOGIN} />;
  }

  return <Slot />;
}
