import { Ionicons } from '@expo/vector-icons';
import type { ReactNode } from 'react';

export type ExpenseOverviewTab = 'personal' | 'shared';

export type ExpenseOverviewTabConfig = {
  label: string;
  title: string;
  value: ExpenseOverviewTab;
  iconName: keyof typeof Ionicons.glyphMap;
};

export type ExpenseOverviewTabsProps = {
  selectedTab: ExpenseOverviewTab;
  onSelectTab: (tab: ExpenseOverviewTab) => void;
  children?: ReactNode;
};
