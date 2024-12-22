export enum Steps {
  LOGIN,
  LOGIN_WITH_EMAIL,
  ENTER_EMAIL,
  ENTER_PASSWORD,
  RESET_PASSWORD,
  RESET_LINK,
}

export type Step = 'email-password' | 'email' | 'password' | 'reset-password';
