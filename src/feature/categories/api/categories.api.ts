import { apiRequest } from '@/services/api';
import type { Category } from '@/feature/categories/types/category.types';

export const listCategories = async (token: string) => {
  const result = await apiRequest<{ success: true; categories: Category[] }>(
    '/api/v0/categories',
    { token },
  );

  return result.data.categories;
};
