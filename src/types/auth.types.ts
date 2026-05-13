export type AuthUser = {
  id: number;
  full_name: string;
  mobile_number: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
};

export type AuthSuccess = {
  success: true;
  token?: string;
  expires_at?: string;
  user: AuthUser;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginFormValues = LoginPayload;

export type SignupPayload = {
  full_name: string;
  mobile_number: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type RegisterFormValues = {
  full_name: string;
  email: string;
  mobile_number: string;
  password: string;
  password_confirmation: string;
};

export type AuthStatus =
  | 'idle'
  | 'restoring'
  | 'signingIn'
  | 'signingUp'
  | 'signingOut';

export type AuthStore = {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  status: AuthStatus;
  isRestoring: boolean;
  restoreSession: () => Promise<void>;
  login: (payload: LoginPayload) => Promise<void>;
  signup: (payload: SignupPayload) => Promise<void>;
  logout: () => Promise<void>;
  clearSession: () => Promise<void>;
};
