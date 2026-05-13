import { View } from 'react-native';

import { mainPlaceholderScreens } from '@/feature/main/constants/mainPlaceholderScreen.constants';
import { MainPlaceholderScreenProps } from '@/feature/main/types/mainPlaceholderScreen.types';
import ThemedText from '@/theme/components/ThemedText';

const MainPlaceholderScreen = ({ screenKey }: MainPlaceholderScreenProps) => {
  const content = mainPlaceholderScreens[screenKey];

  return (
    <View className="flex-1 bg-white px-6 py-8">
      <ThemedText className="text-2xl text-gray-900" weight="semiBold">
        {content.title}
      </ThemedText>
      <ThemedText className="mt-2 text-gray-500">
        {content.description}
      </ThemedText>
    </View>
  );
};

export default MainPlaceholderScreen;
