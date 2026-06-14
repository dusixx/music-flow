import { SchemaPathTree } from '@angular/forms/signals';
import { SignupFormData } from '@app/pages/auth/form/models/signup.model';
import { emailSchemaFn } from '@app/pages/auth/form/schemas/email.schema';
import { confirmPasswordSchemaFn } from '../form/schemas/confirm-password.schema';
import { nameSchemaFn } from '../form/schemas/name.schema';
import { passwordSchemaFn } from '../form/schemas/password.schema';

export const signupSchemaFn = (schemaPath: SchemaPathTree<SignupFormData>) => {
  nameSchemaFn(schemaPath);
  emailSchemaFn(schemaPath);
  passwordSchemaFn(schemaPath);
  confirmPasswordSchemaFn(schemaPath);
};
