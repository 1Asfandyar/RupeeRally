import '../../global.css';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';

import { appFonts } from '@/theme/fonts';

export default function RootLayout() {
  const [fontsLoaded] = useFonts(appFonts);

  if (!fontsLoaded) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
