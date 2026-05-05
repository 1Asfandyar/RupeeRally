import Constants from 'expo-constants';

export const ENV = {
  API_URL: Constants.expoConfig?.extra?.apiUrl || 'https://api.example.com',
  APP_NAME: Constants.expoConfig?.extra?.appName || 'Rupee Rally',
} as const;

export const validateEnv = (): boolean => {
  const required = ['API_URL', 'APP_NAME'];
  const missing = required.filter(key => !ENV[key as keyof typeof ENV]);
  if (missing.length > 0) {
    console.warn(`Missing env vars: ${missing.join(', ')}`);
    return false;
  }
  return true;
};
