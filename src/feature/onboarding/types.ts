import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';

import type { Currency } from '@/types/currency.types';

export type IconName = ComponentProps<typeof Ionicons>['name'];

export type OnboardingCurrencyOption = Currency & {
  icon: IconName;
};

export type AccountIconOption = {
  label: string;
  icon: IconName;
};

export type AccountColorOption = {
  label: string;
  value: string;
};

export type OnboardingStep = 0 | 1 | 2 | 3;

export type OnboardingFlow = {
  currentStep: OnboardingStep;
  totalSteps: number;
  currencyOptions: OnboardingCurrencyOption[];
  selectedCurrency: OnboardingCurrencyOption;
  accountName: string;
  selectedAccountIcon: IconName;
  selectedAccountColor: string;
  openingBalance: string;
  canContinue: boolean;
  showSkip: boolean;
  isCompleting: boolean;
  onboardingError: string | null;
  setSelectedCurrencyCode: (code: string) => void;
  setAccountName: (name: string) => void;
  setSelectedAccountIcon: (icon: IconName) => void;
  setSelectedAccountColor: (color: string) => void;
  setOpeningBalance: (balance: string) => void;
  handleContinue: () => Promise<void>;
  handleBack: () => void;
  handleSkip: () => Promise<void>;
};

export type OnboardingViewProps = {
  flow: OnboardingFlow;
};

export type CurrencyStepProps = {
  currencies: OnboardingCurrencyOption[];
  selectedCurrency: OnboardingCurrencyOption;
  onSelectCurrency: (code: string) => void;
};

export type AccountStepProps = {
  accountName: string;
  selectedCurrency: OnboardingCurrencyOption;
  selectedAccountIcon: IconName;
  selectedAccountColor: string;
  onAccountNameChange: (name: string) => void;
  onSelectAccountIcon: (icon: IconName) => void;
  onSelectAccountColor: (color: string) => void;
};

export type BalanceStepProps = {
  accountName: string;
  openingBalance: string;
  selectedCurrency: OnboardingCurrencyOption;
  selectedAccountIcon: IconName;
  selectedAccountColor: string;
  onOpeningBalanceChange: (balance: string) => void;
};
