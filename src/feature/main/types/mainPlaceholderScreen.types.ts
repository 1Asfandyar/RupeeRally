import { mainPlaceholderScreens } from '@/feature/main/constants/mainPlaceholderScreen.constants';

export type MainPlaceholderScreenKey = keyof typeof mainPlaceholderScreens;

export type MainPlaceholderScreenProps = {
  screenKey: MainPlaceholderScreenKey;
};
