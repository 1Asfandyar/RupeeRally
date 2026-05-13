import { apiRequest } from '@/services/api';
import {
  Account,
  CreateAccountPayload,
  UpdateAccountPayload,
} from '@/types/account.types';

export const listAccounts = async (token: string) => {
  const result = await apiRequest<{ success: true; accounts: Account[] }>(
    '/api/v0/accounts',
    { token },
  );

  return result.data.accounts;
};

export const getAccount = async (token: string, id: number) => {
  const result = await apiRequest<{ success: true; account: Account }>(
    `/api/v0/accounts/${id}`,
    { token },
  );

  return result.data.account;
};

export const createAccount = async (
  token: string,
  payload: CreateAccountPayload,
) => {
  const result = await apiRequest<{ success: true; account: Account }>(
    '/api/v0/accounts',
    {
      method: 'POST',
      token,
      body: payload,
    },
  );

  return result.data.account;
};

export const updateAccount = async (
  token: string,
  id: number,
  payload: UpdateAccountPayload,
) => {
  const result = await apiRequest<{ success: true; account: Account }>(
    `/api/v0/accounts/${id}`,
    {
      method: 'PATCH',
      token,
      body: payload,
    },
  );

  return result.data.account;
};

export const deleteAccount = async (token: string, id: number) => {
  await apiRequest<{ success: true }>(`/api/v0/accounts/${id}`, {
    method: 'DELETE',
    token,
  });
};
