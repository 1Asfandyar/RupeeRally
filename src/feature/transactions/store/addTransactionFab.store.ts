import { create } from 'zustand';

import type { AddTransactionFabStore } from '@/feature/transactions/types/addTransactionFab.types';

export const useAddTransactionFabStore = create<AddTransactionFabStore>(
  (set) => ({
    closeMenu: () => set({ isExpanded: false }),
    isExpanded: false,
    toggleMenu: () =>
      set((state) => ({ isExpanded: !state.isExpanded })),
  }),
);
