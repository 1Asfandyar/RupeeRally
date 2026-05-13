import * as SecureStore from 'expo-secure-store';

import { AuthUser } from '@/types/auth.types';

const AUTH_TOKEN_KEY = 'auth_token';
const AUTH_USER_KEY = 'auth_user';

const isStoredAuthUser = (user: unknown): user is AuthUser => {
  if (typeof user !== 'object' || user === null) return false;

  const candidate = user as Partial<AuthUser>;

  return (
    typeof candidate.id === 'number' &&
    typeof candidate.full_name === 'string' &&
    typeof candidate.mobile_number === 'string' &&
    typeof candidate.email === 'string' &&
    typeof candidate.role === 'string' &&
    typeof candidate.created_at === 'string' &&
    typeof candidate.updated_at === 'string'
  );
};

export const getStoredToken = () => SecureStore.getItemAsync(AUTH_TOKEN_KEY);

export const getStoredUser = async () => {
  const user = await SecureStore.getItemAsync(AUTH_USER_KEY);
  if (!user) return null;

  try {
    const parsedUser = JSON.parse(user);
    return isStoredAuthUser(parsedUser) ? parsedUser : null;
  } catch {
    return null;
  }
};

export const saveSession = async (token: string, user: AuthUser) => {
  await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
  await SecureStore.setItemAsync(AUTH_USER_KEY, JSON.stringify(user));
};

export const removeSession = async () => {
  await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
  await SecureStore.deleteItemAsync(AUTH_USER_KEY);
};
