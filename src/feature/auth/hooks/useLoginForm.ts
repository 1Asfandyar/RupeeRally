import { Router } from 'expo-router';
import { FormikErrors, useFormik } from 'formik';
import { useCallback, useState } from 'react';

import { ERROR_MESSAGES } from '@/config/constants';
import { ROUTES } from '@/config/routes';
import { loginValidationSchema } from '@/feature/auth/utils/authValidation';
import { ApiError } from '@/services/api';
import { useAuthStore } from '@/store/auth.store';
import { ApiFieldErrors } from '@/types/api.types';
import { LoginFormValues } from '@/types/auth.types';

const initialValues: LoginFormValues = {
  email: '',
  password: '',
};

const getLoginFieldErrors = (
  fieldErrors: ApiFieldErrors,
): FormikErrors<LoginFormValues> => ({
  email: fieldErrors.email,
  password: fieldErrors.password,
});

export const useLoginForm = (router: Router) => {
  const login = useAuthStore((state) => state.login);
  const isSigningIn = useAuthStore((state) => state.status === 'signingIn');
  const [formError, setFormError] = useState('');

  const formik = useFormik<LoginFormValues>({
    initialValues,
    validationSchema: loginValidationSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (formValues, helpers) => {
      setFormError('');

      try {
        await login({
          email: formValues.email.trim(),
          password: formValues.password,
        });
        router.replace(ROUTES.ONBOARDING);
      } catch (error) {
        if (error instanceof ApiError) {
          const hasFieldErrors = Object.keys(error.fieldErrors).some(
            (field) => field !== 'base',
          );

          helpers.setErrors(getLoginFieldErrors(error.fieldErrors));
          setFormError(
            error.status === 401
              ? ERROR_MESSAGES.INVALID_CREDENTIALS
              : error.fieldErrors.base || (hasFieldErrors ? '' : error.message),
          );
          return;
        }

        setFormError(ERROR_MESSAGES.NETWORK_ERROR);
      }
    },
  });
  const {
    errors,
    handleSubmit,
    isSubmitting,
    setFieldError,
    setFieldTouched,
    setFieldValue,
    validateField: runFieldValidation,
    values,
  } = formik;

  const updateField = useCallback(
    (field: keyof LoginFormValues, value: string) => {
      void setFieldValue(field, value, false);
      setFieldError(field, undefined);
      setFormError('');
    },
    [setFieldError, setFieldValue],
  );

  const validateField = useCallback(
    (field: keyof LoginFormValues) => {
      void setFieldTouched(field, true, false);
      void runFieldValidation(field);
    },
    [runFieldValidation, setFieldTouched],
  );

  const submit = useCallback(() => {
    handleSubmit();
  }, [handleSubmit]);

  return {
    values,
    fieldErrors: errors,
    formError,
    isLoading: isSigningIn || isSubmitting,
    submit,
    updateField,
    validateField,
  };
};
