export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const SIGNUP_INITIAL_MODEL: SignupFormData = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};
