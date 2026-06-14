import {
  ChangeDetectionStrategy,
  Component,
  signal,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { Router } from '@angular/router';
import { form, FormField, maxLength, required } from '@angular/forms/signals';
import { AuthService } from '@core/services/auth/auth-service';
import { PlaylistApiService } from '@core/services/playlist/playlist-api-service';
import { CreatePlaylistInput } from '@shared/models/firestore.model';
import { Button } from '@shared/components/button/button';
import { Sprite } from '@app/shared/components/sprite/sprite';

interface PlaylistFormData {
  name: string;
  description: string;
}

const PLAYLIST_INIT_MODEL: PlaylistFormData = { name: '', description: '' };
const MAX_LENGTH = 20;
const SHOW_COUNTER_AT = 30;
const MESSAGES = {
  FIELD_REQUIRED: 'Playlist name is required.',
  MAX_CHARS: `Name cannot be longer than ${MAX_LENGTH} characters`,
} as const;

@Component({
  selector: 'player-playlist-create',
  imports: [FormField, Button, Sprite],
  templateUrl: './playlist-create.html',
  styleUrl: './playlist-create.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PlaylistApiService],
})
export class PlaylistCreate {
  private router = inject(Router);
  private authService = inject(AuthService);
  private playlistApiService = inject(PlaylistApiService);

  protected readonly maxLength = MAX_LENGTH;
  protected readonly showCounterAt = SHOW_COUNTER_AT;

  protected playlistModel = signal(PLAYLIST_INIT_MODEL);
  protected playlistForm = form(this.playlistModel, (schemaPath) => {
    required(schemaPath.name, { message: MESSAGES.FIELD_REQUIRED });
    maxLength(schemaPath.name, MAX_LENGTH, { message: MESSAGES.MAX_CHARS });
  });

  protected isLoading = signal(false);

  protected nameError = computed(() => {
    const field = this.playlistForm.name();
    if (!field.touched()) return null;
    const [firstError] = field.errors();
    return firstError?.message ?? null;
  });

  protected nameLength = computed(() => this.playlistForm.name().value().length);

  title = input('New Playlist');
  submitText = input('Create');

  closeForm = output<void>();

  private async createNewPlaylist(data: PlaylistFormData) {
    const uid = this.authService.user()?.uid;
    if (!uid) return;
    const { name, description } = data;
    this.isLoading.set(true);
    const newPlaylistData: CreatePlaylistInput = {
      name: name.trim(),
      description: description?.trim() || undefined,
      trackIds: [],
      uid,
    };
    try {
      const newPlaylistId = await this.playlistApiService.createPlaylist(newPlaylistData);
      this.playlistModel.set(PLAYLIST_INIT_MODEL);
      this.closeForm.emit();
      await this.router.navigate(['/library/playlist', newPlaylistId]);
    } catch (error) {
      console.error('PlaylistCreate]', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  protected async onSubmit(event: Event) {
    event.preventDefault();
    if (!this.playlistForm().valid()) {
      this.playlistForm().markAsTouched();
      return;
    }
    this.createNewPlaylist(this.playlistModel());
  }
}
