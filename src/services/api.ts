import { ENV } from '@/config/env';
import { ApiFieldErrors, ApiRequestOptions, ApiResponse } from '@/types/api.types';

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public fieldErrors: ApiFieldErrors = {},
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const API_URL = ENV.API_URL.replace(/\/$/, '');

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const parseErrorBody = (data: unknown) => {
  const firstError =
    isRecord(data) && Array.isArray(data.errors) ? data.errors[0] : null;
  const fieldErrors: ApiFieldErrors = {};

  if (isRecord(firstError)) {
    Object.entries(firstError).forEach(([key, value]) => {
      fieldErrors[key] = Array.isArray(value) ? String(value[0]) : String(value);
    });
  }

  const message =
    fieldErrors.base ||
    (isRecord(data) && typeof data.message === 'string' ? data.message : null) ||
    'Something went wrong. Please try again.';

  return { message, fieldErrors };
};

const toBearerToken = (token: string) =>
  token.startsWith('Bearer ') ? token : `Bearer ${token}`;

export const extractBearerToken = (response: Response, data?: { token?: string }) => {
  const headerToken = response.headers.get('authorization');
  if (headerToken) return toBearerToken(headerToken);

  const bodyToken = data?.token;
  if (!bodyToken) return null;

  return toBearerToken(bodyToken);
};

export const apiRequest = async <T>(
  endpoint: string,
  options: ApiRequestOptions = {},
): Promise<ApiResponse<T>> => {
  const headers: Record<string, string> = {
    Accept: 'application/json',
  };

  if (options.body) {
    headers['Content-Type'] = 'application/json';
  }

  if (options.token) {
    headers.Authorization = options.token;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method: options.method ?? 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const text = await response.text();
  let data: unknown = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }

  if (!response.ok) {
    const { message, fieldErrors } = parseErrorBody(data);
    throw new ApiError(response.status, message, fieldErrors);
  }

  return { data: data as T, response };
};
