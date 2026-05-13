import { Redirect } from 'expo-router';
import { useAuthStore } from '@/store/auth.store';
import { ROUTES } from '@/config/routes';

export default function Home() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Redirect href={ROUTES.MAIN_HOME} />;
  }

  return <Redirect href={ROUTES.AUTH_LOGIN} />;
}
