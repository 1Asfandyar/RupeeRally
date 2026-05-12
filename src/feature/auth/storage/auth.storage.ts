import * as SecureStore from 'expo-secure-store';

import { AuthUser } from '@/types/auth.types';

const AUTH_TOKEN_KEY = 'auth_token';
const AUTH_USER_KEY = 'auth_user';

export const getStoredToken = () => SecureStore.getItemAsync(AUTH_TOKEN_KEY);

export const getStoredUser = async () => {
  const user = await SecureStore.getItemAsync(AUTH_USER_KEY);
  if (!user) return null;

  try {
    return JSON.parse(user) as AuthUser;
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

