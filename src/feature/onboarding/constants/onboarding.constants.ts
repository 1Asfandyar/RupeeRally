import { themeColors } from '@/theme/utilities';
import { Currency } from '@/types/currency.types';
import { fallbackCurrencies } from '@/utils/currency';

import type {
  AccountColorOption,
  AccountIconOption,
  IconName,
  OnboardingCurrencyOption,
} from '../types';

const currencyIconsByCode: Record<string, IconName> = {
  PKR: 'cash-outline',
  USD: 'card-outline',
  EUR: 'wallet-outline',
  GBP: 'business-outline',
};

const defaultCurrencyIcon: IconName = 'cash-outline';

export const toOnboardingCurrencyOptions = (
  currencies: Currency[],
): OnboardingCurrencyOption[] =>
  currencies.map((currency) => ({
    ...currency,
    icon: currencyIconsByCode[currency.code] ?? defaultCurrencyIcon,
  }));

export const fallbackOnboardingCurrencies =
  toOnboardingCurrencyOptions(fallbackCurrencies);

export const accountIcons: AccountIconOption[] = [
  { label: 'Wallet', icon: 'wallet-outline' },
  { label: 'Card', icon: 'card-outline' },
  { label: 'Cash', icon: 'cash-outline' },
  { label: 'Bank', icon: 'business-outline' },
];

export const accountColors: AccountColorOption[] = [
  { label: 'Mint', value: themeColors.primary },
  { label: 'Teal', value: themeColors.secondary },
  { label: 'Gold', value: themeColors.accent },
  { label: 'Blue', value: '#3B82F6' },
  { label: 'Rose', value: '#F43F5E' },
];

export const totalOnboardingSteps = 4;
