import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';

import { ROUTES } from '@/config/routes';
import { useAuthStore } from '@/store/auth.store';
import ThemedButton from '@/theme/components/ThemedButton';
import ThemedText from '@/theme/components/ThemedText';

export default function Dashboard() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const isSigningOut = useAuthStore((state) => state.status === 'signingOut');

  const handleLogout = async () => {
    await logout();
    router.replace(ROUTES.AUTH_LOGIN);
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-6 py-8">
      <View className="flex-1 justify-between">
        <View>
          <ThemedText className="text-2xl text-gray-900" weight="semiBold">
            Welcome{user?.full_name ? `, ${user.full_name}` : ''}
          </ThemedText>
          <ThemedText className="mt-2 text-gray-500">
            {user?.email}
          </ThemedText>
        </View>

        <ThemedButton
          title="Logout"
          variant="outline"
          onPress={handleLogout}
          loading={isSigningOut}
          containerClassName="w-full"
        />
      </View>
    </SafeAreaView>
  );
}
