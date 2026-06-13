import { SchemaPathTree, validate } from '@angular/forms/signals';
import { ValidationMessage } from '@app/shared/constants/validation';

interface Model {
  confirmPassword: string;
  password: string;
}
export const confirmPasswordSchemaFn = (schemaPath: SchemaPathTree<Model>) => {
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
