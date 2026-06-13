import { required, SchemaPathTree } from '@angular/forms/signals';
import { ValidationMessage } from '@app/shared/constants/validation';
import { LoginFormData } from '@features/auth/shared/models/auth.models';
import { emailSchemaFn } from '@features/auth/shared/schemas/email.schema';

export const loginSchemaFn = (schemaPath: SchemaPathTree<LoginFormData>) => {
  emailSchemaFn(schemaPath);

  required(schemaPath.password, {
    message: ValidationMessage.Required,
  });
};
