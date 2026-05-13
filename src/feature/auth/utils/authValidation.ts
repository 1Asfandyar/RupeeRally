import * as Yup from 'yup';

const PHONE_ALLOWED_PATTERN = /^[+\d\s()-]+$/;
const PASSWORD_MIN_LENGTH = 8;
const PHONE_MIN_DIGITS = 7;
const PHONE_MAX_DIGITS = 15;

const getPhoneDigits = (mobileNumber: string) => mobileNumber.replace(/\D/g, '');

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email('Enter a valid email address')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export const registerValidationSchema = Yup.object({
  full_name: Yup.string()
    .trim()
    .min(2, 'Full name must be at least 2 characters')
    .required('Full name is required'),
  email: Yup.string()
    .trim()
    .email('Enter a valid email address')
    .required('Email is required'),
  mobile_number: Yup.string()
    .trim()
    .required('Mobile number is required')
    .matches(PHONE_ALLOWED_PATTERN, 'Enter a valid mobile number')
    .test(
      'mobile-number-length',
      'Mobile number must be between 7 and 15 digits',
      (value) => {
        const digits = getPhoneDigits(value || '');

        return digits.length >= PHONE_MIN_DIGITS && digits.length <= PHONE_MAX_DIGITS;
      },
    ),
  password: Yup.string()
    .min(
      PASSWORD_MIN_LENGTH,
      `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
    )
    .required('Password is required'),
  password_confirmation: Yup.string()
    .required('Confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords do not match'),
});

export const normalizeMobileNumber = (mobileNumber: string, countryDialCode: string) => {
  const value = mobileNumber.replace(/[\s()-]/g, '');
  if (value.startsWith('+')) return value;

  return `${countryDialCode}${value.replace(/^0+/, '')}`;
};
