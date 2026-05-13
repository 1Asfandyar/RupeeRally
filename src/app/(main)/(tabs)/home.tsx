import { View } from 'react-native';

import { useAuthStore } from '@/store/auth.store';
import ThemedText from '@/theme/components/ThemedText';

export default function HomeTab() {
  const user = useAuthStore((state) => state.user);

  return (
    <View className="flex-1 bg-white px-6 py-8">
      <ThemedText className="text-2xl text-gray-900" weight="semiBold">
        Welcome{user?.full_name ? `, ${user.full_name}` : ''}
      </ThemedText>
      <ThemedText className="mt-2 text-gray-500">
        {user?.email || 'You are logged in'}
      </ThemedText>
    </View>
  );
}
