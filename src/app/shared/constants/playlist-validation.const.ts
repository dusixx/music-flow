import { PlaylistFormData } from '@shared/models/playlist.model';

export const playlistInitModel: PlaylistFormData = { name: '', description: '' };

export const MAX_LENGTH = 40;
export const SHOW_COUNTER_AT = 30;

export const validationMessages = {
  FIELD_REQUIRED: 'Playlist name is required.',
  MAX_CHARS: `Name cannot be longer than ${MAX_LENGTH} characters`,
} as const;
