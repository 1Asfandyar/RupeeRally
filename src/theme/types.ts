import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { TextInputProps, TextProps, TouchableOpacityProps } from 'react-native';

import { CountryOption } from '@/types/country.types';

export type FontWeight = 'regular' | 'medium' | 'semiBold' | 'bold';

export type ThemedButtonProps = TouchableOpacityProps & {
  title: string;
  weight?: FontWeight;
  variant?: 'primary' | 'outline' | 'ghost';
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: ComponentProps<typeof Ionicons>['name'];
  rightIcon?: ComponentProps<typeof Ionicons>['name'];
  iconSize?: number;
  containerClassName?: string;
  textClassName?: string;
};

export type ThemedTextProps = TextProps & {
  weight?: FontWeight;
};

export type ThemedTextInputProps = TextInputProps & {
  weight?: FontWeight;
  label?: string;
  inlineLabel?: string;
  inlineLabelIcon?: ComponentProps<typeof Ionicons>['name'];
  isProminent?: boolean;
  leftIcon?: ComponentProps<typeof Ionicons>['name'];
  rightIcon?: ComponentProps<typeof Ionicons>['name'];
  onRightIconPress?: () => void;
  error?: string;
  containerClassName?: string;
  inputClassName?: string;
  borderClassName?: string;
  selectDate?: boolean;
};

export type ThemedPhoneInputProps = ThemedTextInputProps & {
  onCountryChange?: (country: CountryOption) => void;
};
