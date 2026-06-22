import {
  ChangeDetectionStrategy,
  Component,
  signal,
  computed,
  inject,
  input,
  output,
  effect,
} from '@angular/core';
import { Router } from '@angular/router';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import { AuthService } from '@core/services/auth/auth-service';
import { PlaylistApiService } from '@core/services/playlist/playlist-api-service';
import { Button } from '@shared/components/button/button';
import { Sprite } from '@shared/components/sprite/sprite';
import { PlaylistFormData } from '@shared/models/playlist.model';
import { CreatePlaylistInput } from '@shared/models/firestore.model';
import { Playlist } from '@shared/models/firestore.model';
import {
  MAX_LENGTH,
  SHOW_COUNTER_AT,
  playlistInitModel,
} from '@shared/constants/playlist-validation.const';
import { playlistSchemaFn } from './playlist-form.schema';

@Component({
  selector: 'player-playlist-form',
  imports: [FormField, Button, Sprite, FormRoot],
  templateUrl: './playlist-form.html',
  styleUrl: './playlist-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PlaylistApiService],
})
export class PlaylistForm {
  private router = inject(Router);
  private authService = inject(AuthService);
  private playlistApiService = inject(PlaylistApiService);

  title = input('New Playlist');
  submitText = input('Create');
  closeForm = output<void>();
  playlistData = input<Playlist | null | undefined>(null);

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

  constructor() {
    effect(() => {
      const editData = this.playlistData();
      if (editData) {
        this.playlistModel.set({
          name: editData.name,
          description: editData.description ?? '',
        });
      }
    });
  }

  public resetForm() {
    this.playlistModel.set({ ...playlistInitModel });
    this.playlistForm().reset();
  }

  protected async onSubmit() {
    if (!this.playlistForm().valid()) {
      this.playlistForm().markAsTouched();
      return;
    }
    // TODO: add notification
    if (this.playlistData()) {
      await this.updatePlaylist(this.playlistModel());
    } else {
      await this.createNewPlaylist(this.playlistModel());
    }
  }

  private async updatePlaylist(data: PlaylistFormData) {
    const currentPlaylist = this.playlistData();
    if (!currentPlaylist) return;

    this.isLoading.set(true);
    try {
      await this.playlistApiService.updatePlaylist(currentPlaylist.id, {
        name: data.name.trim(),
        description: data.description?.trim() ?? '',
      });

      this.closeForm.emit();
    } catch (error) {
      console.error('[PlaylistEdit]', error);
    } finally {
      this.isLoading.set(false);
    }
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
    const trimmedDesc = description?.trim();
    if (trimmedDesc) {
      newPlaylistData.description = trimmedDesc;
    }
    try {
      const newPlaylistId = await this.playlistApiService.createPlaylist(newPlaylistData);
      this.resetForm();
      this.closeForm.emit();
      await this.router.navigate(['/playlists', newPlaylistId]);
    } catch (error) {
      console.error('PlaylistCreate]', error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
