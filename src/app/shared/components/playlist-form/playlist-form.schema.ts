import { required, maxLength, SchemaPathTree } from '@angular/forms/signals';
import { validationMessages } from '@shared/constants/playlist-validation.const';
import { PlaylistFormData } from '@shared/models/playlist.model';
import { MAX_LENGTH } from '@shared/constants/playlist-validation.const';

export const playlistSchemaFn = (schemaPath: SchemaPathTree<PlaylistFormData>) => {
  required(schemaPath.name, {
    message: validationMessages.FIELD_REQUIRED,
  });
  maxLength(schemaPath.name, MAX_LENGTH, {
    message: `Name cannot be longer than ${MAX_LENGTH} characters`,
  });
};
