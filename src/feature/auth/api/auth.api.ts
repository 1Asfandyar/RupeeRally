import { apiRequest, extractBearerToken } from '@/services/api';
import { AuthSuccess, AuthUser, LoginPayload, SignupPayload } from '@/types/auth.types';

export const login = async (payload: LoginPayload) => {
  const result = await apiRequest<AuthSuccess>('/api/v0/auth/login', {
    method: 'POST',
    body: payload,
  });
  const token = extractBearerToken(result.response, result.data);

  if (!token) {
    throw new Error('Login succeeded, but no auth token was returned.');
  }

  return { token, user: result.data.user };
};

export const signup = async (payload: SignupPayload) => {
  const result = await apiRequest<AuthSuccess>('/api/v0/auth/signup', {
    method: 'POST',
    body: payload,
  });
  const token = extractBearerToken(result.response, result.data);

  if (!token) {
    throw new Error('Signup succeeded, but no auth token was returned.');
  }

  return { token, user: result.data.user };
};

export const getMe = async (token: string) => {
  const result = await apiRequest<{ success: true; user: AuthUser }>('/api/v0/me', {
    token,
  });

  return result.data.user;
};

export const logout = async (token: string) => {
  await apiRequest<{ success: true; message: string }>('/api/v0/auth/logout', {
    method: 'DELETE',
    token,
  });
};

