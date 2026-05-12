import { ApiFieldErrors } from '@/types/api.types';
import { LoginFormValues, RegisterFormValues } from '@/types/auth.types';

export const validateLoginForm = (values: LoginFormValues): ApiFieldErrors => {
  const errors: ApiFieldErrors = {};

  if (!values.email.trim()) errors.email = 'Email is required';
  if (!values.password) errors.password = 'Password is required';

  return errors;
};

export const validateRegisterForm = (values: RegisterFormValues): ApiFieldErrors => {
  const errors: ApiFieldErrors = {};

  if (!values.full_name.trim()) errors.full_name = 'Full name is required';
  if (!values.email.trim()) errors.email = 'Email is required';
  if (!values.mobile_number.trim()) errors.mobile_number = 'Mobile number is required';
  if (!values.password) errors.password = 'Password is required';
  if (values.password !== values.password_confirmation) {
    errors.password_confirmation = 'Passwords do not match';
  }

  return errors;
};

export const normalizeMobileNumber = (mobileNumber: string, countryDialCode: string) => {
  const value = mobileNumber.replace(/[\s()-]/g, '');
  if (value.startsWith('+')) return value;

  return `${countryDialCode}${value.replace(/^0+/, '')}`;
};

