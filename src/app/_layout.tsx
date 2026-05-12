import '../../global.css';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { appFonts } from '@/theme/fonts';
import { useAuthStore } from '@/store/auth.store';
import { themeColors } from '@/theme/utilities';

export default function RootLayout() {
  const [fontsLoaded] = useFonts(appFonts);
  const restoreSession = useAuthStore((state) => state.restoreSession);
  const isRestoring = useAuthStore((state) => state.isRestoring);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  if (!fontsLoaded || isRestoring) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator color={themeColors.primary} />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
