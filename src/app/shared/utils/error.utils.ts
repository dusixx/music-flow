import { FirebaseError } from 'firebase/app';
import { hasOwnKeys } from './object.utils';
import { capitalize } from './string.utils';

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof FirebaseError) {
    return parseFirebaseErrorCode(error);
  }
  return hasOwnKeys<Error>(error, 'message') ? error.message : String(error);
};

export const parseFirebaseErrorCode = (error: FirebaseError): string => {
  const [, code] = error.code.split('/');
  const message = code
    .split('-')
    .map((s) => s.trim())
    .join(' ');

  return capitalize(message);
};
