import { MainTabBarItem } from '@/feature/main/types/mainTabBar.types';

export const mainTabBarItems: MainTabBarItem[] = [
  {
    routeName: 'home',
    title: 'Home',
    accessibilityLabel: 'Open home',
    iconName: 'home-outline',
  },
  {
    routeName: 'transactions',
    title: 'Transactions',
    accessibilityLabel: 'Open transactions',
    iconName: 'swap-vertical-outline',
  },
  {
    routeName: 'groups',
    title: 'Groups',
    accessibilityLabel: 'Open groups',
    iconName: 'people-outline',
  },
  {
    routeName: 'reports',
    title: 'Reports',
    accessibilityLabel: 'Open reports',
    iconName: 'bar-chart-outline',
  },
  {
    routeName: 'profile',
    title: 'Profile',
    accessibilityLabel: 'Open profile',
    iconName: 'person-outline',
  },
];
