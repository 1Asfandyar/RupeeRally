import '../../global.css';
import * as SplashScreen from 'expo-splash-screen';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import AppSplashScreen from '@/feature/splash/components/AppSplashScreen';
import { appFonts } from '@/theme/fonts';
import { useAuthStore } from '@/store/auth.store';
import { themeColors } from '@/theme/utilities';

export { ErrorBoundary } from 'expo-router';

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts(appFonts);
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const restoreSession = useAuthStore((state) => state.restoreSession);
  const isRestoring = useAuthStore((state) => state.isRestoring);
  const isAppReady = fontsLoaded && !isRestoring;

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  useEffect(() => {
    SplashScreen.hideAsync().catch(() => undefined);
  }, []);

  const handleSplashAnimationFinish = useCallback(() => {
    setIsSplashVisible(false);
  }, []);

  return (
    <View style={styles.root}>
      {isAppReady ? <Stack screenOptions={{ headerShown: false }} /> : null}
      {isSplashVisible ? (
        <AppSplashScreen
          isAppReady={isAppReady}
          onAnimationFinish={handleSplashAnimationFinish}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: themeColors.white,
    flex: 1,
  },
});
