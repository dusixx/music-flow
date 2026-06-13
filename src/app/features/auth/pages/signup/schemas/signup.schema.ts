import { SchemaPathTree } from '@angular/forms/signals';
import { SignupFormData } from '@features/auth/shared/models/auth.models';
import { emailSchemaFn } from '@features/auth/shared/schemas/email.schema';
import { confirmPasswordSchemaFn } from './confirm-password.schema';
import { nameSchemaFn } from './name.schema';
import { passwordSchemaFn } from './password.schema';

export const signupSchemaFn = (schemaPath: SchemaPathTree<SignupFormData>) => {
  nameSchemaFn(schemaPath);
  emailSchemaFn(schemaPath);
  passwordSchemaFn(schemaPath);
  confirmPasswordSchemaFn(schemaPath);
};
