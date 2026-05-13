import { useRouter } from 'expo-router';
import { FormikErrors, useFormik } from 'formik';
import { useCallback, useState } from 'react';

import { ERROR_MESSAGES } from '@/config/constants';
import { ROUTES } from '@/config/routes';
import {
  normalizeMobileNumber,
  registerValidationSchema,
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

const getRegisterFieldErrors = (
  fieldErrors: ApiFieldErrors,
): FormikErrors<RegisterFormValues> => ({
  full_name: fieldErrors.full_name,
  email: fieldErrors.email,
  mobile_number: fieldErrors.mobile_number,
  password: fieldErrors.password,
  password_confirmation: fieldErrors.password_confirmation,
});

export const useRegisterForm = () => {
  const router = useRouter();
  const signup = useAuthStore((state) => state.signup);
  const isSigningUp = useAuthStore((state) => state.status === 'signingUp');
  const [countryDialCode, setCountryDialCode] = useState('+92');
  const [formError, setFormError] = useState('');

  const formik = useFormik<RegisterFormValues>({
    initialValues,
    validationSchema: registerValidationSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (formValues, helpers) => {
      setFormError('');

      try {
        await signup({
          full_name: formValues.full_name.trim(),
          email: formValues.email.trim(),
          mobile_number: normalizeMobileNumber(
            formValues.mobile_number,
            countryDialCode,
          ),
          password: formValues.password,
          password_confirmation: formValues.password_confirmation,
        });
        router.replace(ROUTES.ONBOARDING);
      } catch (error) {
        if (error instanceof ApiError) {
          const hasFieldErrors = Object.keys(error.fieldErrors).some(
            (field) => field !== 'base',
          );

          helpers.setErrors(getRegisterFieldErrors(error.fieldErrors));
          setFormError(error.fieldErrors.base || (hasFieldErrors ? '' : error.message));
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
    (field: keyof RegisterFormValues, value: string) => {
      void setFieldValue(field, value, false);
      setFieldError(field, undefined);

      if (field === 'password') {
        setFieldError('password_confirmation', undefined);
      }

      setFormError('');
    },
    [setFieldError, setFieldValue],
  );

  const validateField = useCallback(
    (field: keyof RegisterFormValues) => {
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
    isLoading: isSigningUp || isSubmitting,
    submit,
    updateField,
    validateField,
    setCountryDialCode,
  };
};
