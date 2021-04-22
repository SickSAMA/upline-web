export const HOME = '/';
export const resumeEdit = (uuid: string | undefined = undefined): string => `/resume/${uuid ? `${uuid}/` : ''}edit`;
export const JOIN = '/join';
export const LOGIN = '/login';
export const RESET_PASSWORD = '/reset-password';
export const CONFIRM_ACCOUNT = '/confirm-account';
export const TERMS_CONDITIONS = '/terms-conditions';
export const PRIVACY_POLICY = '/privacy-policy';
