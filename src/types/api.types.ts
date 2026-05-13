export type ApiFieldErrors = Record<string, string>;

export type ApiRequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  token?: string | null;
};

export type ApiResponse<T> = {
  data: T;
  response: Response;
};

