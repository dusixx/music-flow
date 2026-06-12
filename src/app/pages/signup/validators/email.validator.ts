import { SchemaPathTree, pattern, required } from '@angular/forms/signals';
import { Regex, ValidationMessage } from '@app/shared/constants/validation';
import { SignupFormData } from '../signup.models';

export const emailSchemaFn = (schemaPath: SchemaPathTree<SignupFormData>) => {
  required(schemaPath.email, {
    message: ValidationMessage.Required,
  });
  pattern(schemaPath.email, Regex.IsValidEmail, {
    message: ValidationMessage.InvalidEmail,
  });
};
