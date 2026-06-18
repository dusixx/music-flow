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
import { form, FormField } from '@angular/forms/signals';
import { AuthService } from '@core/services/auth/auth-service';
import { PlaylistApiService } from '@core/services/playlist/playlist-api-service';
import { Button } from '@shared/components/button/button';
import { Sprite } from '@shared/components/sprite/sprite';
import { PlaylistFormData } from '@shared/models/playlist.model';
import { CreatePlaylistInput } from '@shared/models/firestore.model';
import {
  MAX_LENGTH,
  SHOW_COUNTER_AT,
  playlistInitModel,
} from '@shared/constants/playlist-validation.const';
import { playlistSchemaFn } from './playlist-create.schema';

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

  title = input('New Playlist');
  submitText = input('Create');
  closeForm = output<void>();

  protected readonly maxLength = MAX_LENGTH;
  protected readonly showCounterAt = SHOW_COUNTER_AT;

  protected playlistModel = signal(playlistInitModel);
  protected playlistForm = form(this.playlistModel, playlistSchemaFn);

  protected isLoading = signal(false);

  protected nameError = computed(() => {
    const field = this.playlistForm.name();
    if (!field.touched()) return null;
    const [firstError] = field.errors();
    return firstError?.message ?? null;
  });

  protected nameLength = computed(() => this.playlistForm.name().value().length);

  protected async onSubmit(event: Event) {
    event.preventDefault();
    if (!this.playlistForm().valid()) {
      this.playlistForm().markAsTouched();
      return;
    }
    await this.createNewPlaylist(this.playlistModel());
  }

  private async createNewPlaylist(data: PlaylistFormData) {
    const uid = this.authService.user()?.uid;
    if (!uid) return;
    const { name, description } = data;
    this.isLoading.set(true);
    const newPlaylistData: CreatePlaylistInput = {
      name: name.trim(),
      trackIds: [],
      uid,
    };
    if (description?.trim()) {
      newPlaylistData.description = description.trim();
    }
    try {
      const newPlaylistId = await this.playlistApiService.createPlaylist(newPlaylistData);
      this.playlistModel.set(playlistInitModel);
      this.closeForm.emit();
      await this.router.navigate(['/playlists', newPlaylistId]);
    } catch (error) {
      console.error('PlaylistCreate]', error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
