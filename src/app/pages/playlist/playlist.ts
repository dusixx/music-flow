import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  resource,
  signal,
  computed,
} from '@angular/core';
import { Router } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { TrackService } from '@core/api/tracks/track-service';
import { PlaylistApiService } from '@core/services/playlist/playlist-api-service';
import { AuthService } from '@core/services/auth/auth-service';
import { TrackRow } from '@shared/components/track-row/track-row/track-row';
import { DurationPipe } from '@shared/pipes/duration-pipe';
import { DurationTextPipe } from '@shared/pipes/duration-text/duration-text-pipe';
import { Sprite } from '@shared/components/sprite/sprite';
import { Button } from '@shared/components/button/button';
import { Dialog } from '@shared/components/dialog/dialog';
import { PlaylistMenu } from './components/playlist-menu/playlist-menu/playlist-menu';

@Component({
  selector: 'player-playlist',
  imports: [TrackRow, DurationPipe, DurationTextPipe, Sprite, Button, PlaylistMenu, Dialog],
  templateUrl: './playlist.html',
  styleUrl: './playlist.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PlaylistApiService],
})
export class Playlist {
  private trackService = inject(TrackService);
  private playlistService = inject(PlaylistApiService);
  private authService = inject(AuthService);
  private router = inject(Router);

  protected id = input.required<string>();

  protected isPlaying = signal(false);
  protected isModalOpen = signal(false);

  protected editPlaylistDetails() {
    console.log('Action>> Edit details clicked');
  }

  protected displayName = computed(() => {
    return this.authService.user()?.displayName ?? 'User';
  });

  protected totalTime = computed(() => {
    const tracks = this.tracksResource.value() ?? [];
    return tracks.reduce((acc, item) => acc + item.duration, 0);
  });

  protected playPlaylist() {
    this.isPlaying.update((value) => !value);
  }

  protected playlistResource = resource({
    loader: async () => {
      return await this.playlistService.getPlaylistById(this.id());
    },
  });

  protected tracksResource = rxResource({
    params: () => this.playlistResource.value()?.trackIds ?? [],
    stream: ({ params: trackIds }) => {
      if (!trackIds.length) {
        return of([]);
      }
      return this.trackService.getTracksByIds(trackIds);
    },
  });

  protected async removeTrackById(trackId: string) {
    const playlist = this.playlistResource.value();
    if (!playlist) return;
    if (playlist.trackIds.length <= 1) {
      console.log('A playlist must contain at least one track.');
      return;
    }
    const updatedTrackIds = playlist.trackIds.filter((id) => id !== trackId);
    try {
      await this.playlistService.updatePlaylist(playlist.id, {
        trackIds: updatedTrackIds,
      });
      this.playlistResource.reload();
    } catch (error) {
      console.error('[removeTrackById]', error);
    }
  }

  protected async confirmDeletePlaylist() {
    this.isModalOpen.set(true);
  }

  protected async deletePlaylist() {
    const playlistId = this.playlistResource.value()?.id;
    if (!playlistId) return;
    try {
      this.isModalOpen.set(false);
      await this.playlistService.deletePlaylist(playlistId);
      // TODO: replace with notification
      console.log('successfully deleted');
      await this.router.navigate(['/library']);
    } catch (error) {
      console.error('[deletePlaylistById]', error);
    }
  }
}
