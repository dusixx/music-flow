import { SchemaPathTree } from '@angular/forms/signals';
import { SignupFormData } from '../signup.models';
import { confirmPasswordSchemaFn } from './confirm-password.validator';
import { emailSchemaFn } from './email.validator';
import { nameSchemaFn } from './name.validator';
import { passwordSchemaFn } from './password.validator';

export const signupFormSchemaFn = (schemaPath: SchemaPathTree<SignupFormData>) => {
  nameSchemaFn(schemaPath);
  emailSchemaFn(schemaPath);
  passwordSchemaFn(schemaPath);
  confirmPasswordSchemaFn(schemaPath);
};
