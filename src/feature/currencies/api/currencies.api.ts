import { apiRequest } from '@/services/api';
import { Currency } from '@/types/currency.types';

export const listCurrencies = async (token: string) => {
  const result = await apiRequest<{ success: true; currencies: Currency[] }>(
    '/api/v0/currencies',
    { token },
  );

  return result.data.currencies;
};
