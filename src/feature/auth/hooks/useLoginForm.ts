import { Router } from 'expo-router';
import { useCallback, useState } from 'react';

import { ERROR_MESSAGES } from '@/config/constants';
import { ROUTES } from '@/config/routes';
import { validateLoginForm } from '@/feature/auth/utils/authValidation';
import { ApiError } from '@/services/api';
import { useAuthStore } from '@/store/auth.store';
import { ApiFieldErrors } from '@/types/api.types';
import { LoginFormValues } from '@/types/auth.types';

const initialValues: LoginFormValues = {
  email: '',
  password: '',
};

export const useLoginForm = (router: Router) => {
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.status === 'signingIn');
  const [values, setValues] = useState<LoginFormValues>(initialValues);
  const [fieldErrors, setFieldErrors] = useState<ApiFieldErrors>({});
  const [formError, setFormError] = useState('');

  const updateField = useCallback((field: keyof LoginFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => ({ ...current, [field]: '' }));
    setFormError('');
  }, []);

  const submit = useCallback(async () => {
    const nextErrors = validateLoginForm(values);

    if (Object.keys(nextErrors).length) {
      setFieldErrors(nextErrors);
      return;
    }

    try {
      await login({ email: values.email.trim(), password: values.password });
      router.replace(ROUTES.MAIN_DASHBOARD);
    } catch (error) {
      if (error instanceof ApiError) {
        const hasFieldErrors = Object.keys(error.fieldErrors).some(
          (field) => field !== 'base',
        );

        setFieldErrors(error.fieldErrors);
        setFormError(
          error.status === 401
            ? ERROR_MESSAGES.INVALID_CREDENTIALS
            : error.fieldErrors.base || (hasFieldErrors ? '' : error.message),
        );
        return;
      }

      setFormError(ERROR_MESSAGES.NETWORK_ERROR);
    }
  }, [login, router, values]);

  return {
    values,
    fieldErrors,
    formError,
    isLoading,
    submit,
    updateField,
  };
};
