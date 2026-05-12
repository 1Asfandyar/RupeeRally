import { Router } from 'expo-router';
import { useCallback, useState } from 'react';

import { ERROR_MESSAGES } from '@/config/constants';
import { ROUTES } from '@/config/routes';
import {
  normalizeMobileNumber,
  validateRegisterForm,
} from '@/feature/auth/utils/authValidation';
import { ApiError } from '@/services/api';
import { useAuthStore } from '@/store/auth.store';
import { ApiFieldErrors } from '@/types/api.types';
import { RegisterFormValues } from '@/types/auth.types';

const initialValues: RegisterFormValues = {
  full_name: '',
  email: '',
  mobile_number: '',
  password: '',
  password_confirmation: '',
};

export const useRegisterForm = (router: Router) => {
  const signup = useAuthStore((state) => state.signup);
  const isLoading = useAuthStore((state) => state.status === 'signingUp');
  const [values, setValues] = useState<RegisterFormValues>(initialValues);
  const [countryDialCode, setCountryDialCode] = useState('+92');
  const [fieldErrors, setFieldErrors] = useState<ApiFieldErrors>({});
  const [formError, setFormError] = useState('');

  const updateField = useCallback((field: keyof RegisterFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => ({ ...current, [field]: '' }));
    setFormError('');
  }, []);

  const submit = useCallback(async () => {
    const nextErrors = validateRegisterForm(values);

    if (Object.keys(nextErrors).length) {
      setFieldErrors(nextErrors);
      return;
    }

    try {
      await signup({
        full_name: values.full_name.trim(),
        email: values.email.trim(),
        mobile_number: normalizeMobileNumber(values.mobile_number, countryDialCode),
        password: values.password,
        password_confirmation: values.password_confirmation,
      });
      router.replace(ROUTES.MAIN_DASHBOARD);
    } catch (error) {
      if (error instanceof ApiError) {
        const hasFieldErrors = Object.keys(error.fieldErrors).some(
          (field) => field !== 'base',
        );

        setFieldErrors(error.fieldErrors);
        setFormError(error.fieldErrors.base || (hasFieldErrors ? '' : error.message));
        return;
      }

      setFormError(ERROR_MESSAGES.NETWORK_ERROR);
    }
  }, [countryDialCode, router, signup, values]);

  return {
    values,
    fieldErrors,
    formError,
    isLoading,
    submit,
    updateField,
    setCountryDialCode,
  };
};
