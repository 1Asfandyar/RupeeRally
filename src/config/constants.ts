import { CountryOption } from "@/types/types";

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network connection failed. Please try again.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  SERVER_ERROR: 'Server error. Please try again later.',
} as const;

export const COUNTRY_OPTIONS: CountryOption[] = [
  { code: 'PK', dialCode: '+92', flag: 'PK', name: 'Pakistan' },
  { code: 'US', dialCode: '+1', flag: 'US', name: 'United States' },
  { code: 'GB', dialCode: '+44', flag: 'GB', name: 'United Kingdom' },
  { code: 'AE', dialCode: '+971', flag: 'AE', name: 'United Arab Emirates' },
  { code: 'IN', dialCode: '+91', flag: 'IN', name: 'India' },
  { code: 'SA', dialCode: '+966', flag: 'SA', name: 'Saudi Arabia' },
];