import { SchemaPathTree, validate } from '@angular/forms/signals';
import { ValidationMessage } from '@app/shared/constants/validation';
import { SignupFormData } from '../../../shared/models/auth.models';

export const confirmPasswordSchemaFn = (schemaPath: SchemaPathTree<SignupFormData>) => {
  validate(schemaPath.confirmPassword, ({ value, valueOf }) => {
    if (value() !== valueOf(schemaPath.password)) {
      return {
        kind: 'confirm',
        message: ValidationMessage.PasswordMismatch,
      };
    }
    return null;
  });
};
