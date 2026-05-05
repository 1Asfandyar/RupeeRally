import { ERROR_MESSAGES } from '@/config/constants';

export class AppError extends Error {
  constructor(
    public code: string,
    public message: string,
    public originalError?: Error,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AppError) return error.message;
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return ERROR_MESSAGES.SERVER_ERROR;
};

export const handleApiError = (error: any): AppError => {
  if (error.response) {
    const status = error.response.status;
    const data = error.response.data;
    
    switch (status) {
      case 401:
        return new AppError('AUTH_ERROR', 'Invalid credentials', error);
      case 404:
        return new AppError('NOT_FOUND', 'Not found', error);
      case 500:
        return new AppError('SERVER_ERROR', ERROR_MESSAGES.SERVER_ERROR, error);
      default:
        return new AppError('ERROR', data.message || ERROR_MESSAGES.SERVER_ERROR, error);
    }
  }
  return new AppError('NETWORK_ERROR', ERROR_MESSAGES.NETWORK_ERROR, error);
};

export const logError = (error: unknown, context?: Record<string, any>): void => {
  console.error('[ERROR]', {
    error: error instanceof Error ? error.message : String(error),
    context,
    timestamp: new Date().toISOString(),
  });
};
