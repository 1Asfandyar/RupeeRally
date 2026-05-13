import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ROUTES } from '@/config/routes';
import { useAuthStore } from '@/store/auth.store';
import ThemedText from '@/theme/components/ThemedText';
import { themeColors } from '@/theme/utilities';

const getInitial = (name?: string) => name?.trim().charAt(0).toUpperCase() || 'U';

const MainHeader = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const isSigningOut = useAuthStore((state) => state.status === 'signingOut');

  const handleLogout = async () => {
    await logout();
    router.replace(ROUTES.AUTH_LOGIN);
  };

  return (
    <SafeAreaView edges={['top']} className="bg-white">
      <View className="flex-row items-center justify-between border-b border-gray-100 px-5 pb-3 pt-2">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open side menu"
          className="h-11 w-11 items-center justify-center rounded-xl bg-gray-100"
        >
          <Ionicons name="menu" size={24} color={themeColors.gray900} />
        </Pressable>

        <View className="flex-row items-center">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Search"
            className="mr-2 h-11 w-11 items-center justify-center rounded-xl bg-gray-100"
          >
            <Ionicons name="search" size={21} color={themeColors.gray700} />
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Notifications"
            className="mr-3 h-11 w-11 items-center justify-center rounded-xl bg-gray-100"
          >
            <Ionicons name="notifications-outline" size={21} color={themeColors.gray700} />
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Logout"
            disabled={isSigningOut}
            onPress={handleLogout}
            className={`max-w-40 flex-row items-center rounded-xl bg-lightBlue px-2 py-2 ${
              isSigningOut ? 'opacity-60' : ''
            }`}
          >
            <View className="h-8 w-8 items-center justify-center rounded-full bg-primary">
              <ThemedText className="text-sm text-white" weight="semiBold">
                {getInitial(user?.full_name)}
              </ThemedText>
            </View>
            <ThemedText
              numberOfLines={1}
              className="ml-2 max-w-24 text-sm text-gray-900"
              weight="medium"
            >
              {user?.full_name || 'Profile'}
            </ThemedText>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MainHeader;
