import { Redirect, Slot } from 'expo-router';
import { View } from 'react-native';

import { ROUTES } from '@/config/routes';
import MainHeader from '@/feature/main/components/MainHeader';
import { useAuthStore } from '@/store/auth.store';

export default function MainLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Redirect href={ROUTES.AUTH_LOGIN} />;
  }

  return (
    <View className="flex-1 bg-white">
      <MainHeader />
      <View className="flex-1">
        <Slot />
      </View>
    </View>
  );
}
