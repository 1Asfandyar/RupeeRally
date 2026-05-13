import { create } from 'zustand';

import {
  getStoredToken,
  getStoredUser,
  removeSession,
  saveSession,
} from '@/feature/auth/storage/auth.storage';
import {
  getMe,
  login as loginRequest,
  logout as logoutRequest,
  signup as signupRequest,
} from '@/feature/auth/api/auth.api';
import { ApiError } from '@/services/api';
import { logger } from '@/services/logger';
import { AuthStore } from '@/types/auth.types';

export const useAuthStore = create<AuthStore>((set, get) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  status: 'restoring',
  isRestoring: true,

  restoreSession: async () => {
    set({ isRestoring: true, status: 'restoring' });

    try {
      const token = await getStoredToken();

      if (!token) {
        set({ token: null, user: null, isAuthenticated: false });
        return;
      }

      const user = await getMe(token);
      await saveSession(token, user);
      set({ token, user, isAuthenticated: true });
    } catch (error) {
      if (!(error instanceof ApiError)) {
        const cachedUser = await getStoredUser();
        const token = await getStoredToken();

        if (token && cachedUser) {
          set({
            token,
            user: cachedUser,
            isAuthenticated: true,
          });
          return;
        }
      }

      try {
        await removeSession();
      } catch (storageError) {
        logger.warn('Failed to clear invalid stored session.', {
          error: storageError instanceof Error ? storageError.message : String(storageError),
        });
      }
      set({ token: null, user: null, isAuthenticated: false });
    } finally {
      set({ isRestoring: false, status: 'idle' });
    }
  },

  login: async (payload) => {
    set({ status: 'signingIn' });

    try {
      const session = await loginRequest(payload);
      await saveSession(session.token, session.user);
      set({
        token: session.token,
        user: session.user,
        isAuthenticated: true,
      });
    } finally {
      set({ status: 'idle' });
    }
  },

  signup: async (payload) => {
    set({ status: 'signingUp' });

    try {
      const session = await signupRequest(payload);
      await saveSession(session.token, session.user);
      set({
        token: session.token,
        user: session.user,
        isAuthenticated: true,
      });
    } finally {
      set({ status: 'idle' });
    }
  },

  logout: async () => {
    const token = get().token;
    set({ status: 'signingOut' });

    try {
      if (token) {
        await logoutRequest(token);
      }
    } catch (error) {
      if (!(error instanceof ApiError) || error.status !== 401) {
        logger.warn('Logout request failed; clearing local session anyway.', {
          error: error instanceof Error ? error.message : String(error),
        });
      }
    } finally {
      try {
        await removeSession();
      } catch (storageError) {
        logger.warn('Failed to clear local session.', {
          error: storageError instanceof Error ? storageError.message : String(storageError),
        });
      }
      set({
        token: null,
        user: null,
        isAuthenticated: false,
        status: 'idle',
      });
    }
  },

  clearSession: async () => {
    try {
      await removeSession();
    } catch (storageError) {
      logger.warn('Failed to clear local session.', {
        error: storageError instanceof Error ? storageError.message : String(storageError),
      });
    }
    set({ token: null, user: null, isAuthenticated: false });
  },
}));
