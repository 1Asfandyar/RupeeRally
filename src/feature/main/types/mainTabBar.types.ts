import { Ionicons } from '@expo/vector-icons';

export type MainTabRouteName =
  | 'home'
  | 'transactions'
  | 'groups'
  | 'reports'
  | 'profile';

export type MainTabBarItem = {
  accessibilityLabel: string;
  iconName: keyof typeof Ionicons.glyphMap;
  routeName: MainTabRouteName;
  title: string;
};
