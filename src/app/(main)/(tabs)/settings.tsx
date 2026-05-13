import { View } from 'react-native';

import ThemedText from '@/theme/components/ThemedText';

export default function SettingsTab() {
  return (
    <View className="flex-1 bg-white px-6 py-8">
      <ThemedText className="text-2xl text-gray-900" weight="semiBold">
        Settings
      </ThemedText>
      <ThemedText className="mt-2 text-gray-500">
        App preferences will live here.
      </ThemedText>
    </View>
  );
}
