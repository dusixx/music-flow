export interface LoginFormData {
  email: string;
  password: string;
}

export const LOGIN: LoginFormData = {
  email: '',
  password: '',
};

export type SignupFormData = LoginFormData & {
  name: string;
  confirmPassword: string;
};

export const SIGNUP_INITIAL_MODEL: SignupFormData = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};
