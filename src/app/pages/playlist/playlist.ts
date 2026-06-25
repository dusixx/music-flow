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
import { map, of } from 'rxjs';
import { TrackService } from '@core/api/tracks/track-service';
import { PlaylistApiService } from '@core/services/playlist/playlist-api-service';
import { AuthService } from '@core/services/auth/auth-service';
import { TrackRow } from '@app/shared/components/track-row/track-row';
import { DurationPipe } from '@shared/pipes/duration-pipe';
import { Sprite } from '@shared/components/sprite/sprite';
import { Button } from '@shared/components/button/button';
import { Dialog } from '@shared/components/dialog/dialog';
import { PlaylistForm } from '@shared/components/playlist-form/playlist-form';
import { Track } from '@shared/models/track';
import { UpdatePlaylistInput } from '@shared/models/firestore.model';
import { PlaylistHeader } from './components/playlist-header/playlist-header';
import { TracksHeader } from './components/tracks-header/tracks-header';

const RECOMMENDATIONS_LIMIT = 3;
const MOSAIC_COVERS_COUNT = 4;

@Component({
  selector: 'player-playlist',
  imports: [
    TrackRow,
    DurationPipe,
    Sprite,
    Button,
    Dialog,
    PlaylistForm,
    PlaylistHeader,
    TracksHeader,
  ],
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
  protected isDeleteModalOpen = signal(false);

  protected isEditModalOpen = signal(false);

  protected displayName = computed(() => {
    return this.authService.user()?.displayName ?? 'User';
  });

  protected totalTime = computed(() => {
    const tracks = this.tracksResource.value() ?? [];
    return tracks.reduce((acc, item) => acc + (item.duration ?? 0), 0);
  });

  protected playPlaylist() {
    this.isPlaying.update((value) => !value);
  }

  protected playlistResource = resource({
    loader: () => {
      return this.playlistService.getPlaylistById(this.id());
    },
  });

  protected trackIds = computed(() => {
    return this.playlistResource.value()?.trackIds ?? [];
  });

  protected tracksResource = rxResource({
    // params: () => this.playlistResource.value()?.trackIds ?? [],
    params: () => this.trackIds(),
    stream: ({ params: trackIds }) => {
      if (!trackIds.length) {
        return of([]);
      }
      return this.trackService.getTracksByIds(trackIds);
    },
  });

  protected recommendedTracksResource = rxResource({
    params: () => this.trackIds(),
    stream: ({ params: trackIds }) => {
      return this.trackService.getPopular().pipe(
        map((allTracks) => {
          const idSet = new Set(trackIds);
          return allTracks
            .filter((t) => !idSet.has(t.id))
            .sort(() => Math.random() - 0.5)
            .slice(0, RECOMMENDATIONS_LIMIT);
        })
      );
    },
  });

  protected refreshRecommendations() {
    this.recommendedTracksResource.reload();
  }

  protected async addToPlaylist(track: Track) {
    // console.log(this.recommendedTracksResource.value())
    const playlist = this.playlistResource.value();
    if (!playlist) return;

    const updatedTrackIds = [...playlist.trackIds, track.id];
    const updates: UpdatePlaylistInput = { trackIds: updatedTrackIds };

    if (updatedTrackIds.length >= MOSAIC_COVERS_COUNT) {
      // console.log(this.tracksResource.value())
      const firstFourIds = updatedTrackIds.slice(0, MOSAIC_COVERS_COUNT);
      const images: string[] = [];
      for (const id of firstFourIds) {
        if (id === track.id) {
          images.push(track.album.image);
        } else {
          const existingTrack = this.tracksResource.value()?.find((track) => track.id === id);
          if (existingTrack) {
            images.push(existingTrack.album.image);
          }
        }
      }
      updates.coverUrl = images;
    } else if (!playlist.trackIds.length) {
      updates.coverUrl = [track.album.image];
    }
    try {
      await this.playlistService.updatePlaylist(playlist.id, updates);
      this.playlistResource.reload();
    } catch (error) {
      console.error('[addToPlaylist]', error);
    }
  }

  protected editPlaylistDetails() {
    this.isEditModalOpen.set(true);
  }

  protected closeEditForm() {
    this.isEditModalOpen.set(false);
    this.playlistResource.reload();
  }

  protected async removeFromPlaylist(track: Track) {
    const playlist = this.playlistResource.value();
    if (!playlist) return;
    if (playlist.trackIds.length === 1) {
      // TODO: add toast here with message: A playlist must contain at least one track.
      return;
    }
    const updatedTrackIds = playlist.trackIds.filter((id) => id !== track.id);

    const updates: UpdatePlaylistInput = {
      trackIds: updatedTrackIds,
    };
    if (updatedTrackIds.length < MOSAIC_COVERS_COUNT) {
      const firstTrackId = updatedTrackIds[0];
      const firstTrack = this.tracksResource.value()?.find((track) => track.id === firstTrackId);
      if (firstTrack) {
        updates.coverUrl = [firstTrack.album.image];
      }
    } else {
      const firstFourIds = updatedTrackIds.slice(0, MOSAIC_COVERS_COUNT);
      const images: string[] = [];
      for (const id of firstFourIds) {
        const existingTrack = this.tracksResource.value()?.find((t) => t.id === id);
        if (existingTrack) {
          images.push(existingTrack.album.image);
        }
      }
      updates.coverUrl = images;
    }
    // console.log('data>>', updates);
    try {
      await this.playlistService.updatePlaylist(playlist.id, updates);
      this.playlistResource.reload();
    } catch (error) {
      console.error('[removeTrackById]', error);
    }
  }

  protected confirmDeletePlaylist() {
    this.isDeleteModalOpen.set(true);
  }

  protected async deletePlaylist() {
    const playlistId = this.playlistResource.value()?.id;
    if (!playlistId) return;
    try {
      this.isDeleteModalOpen.set(false);
      await this.playlistService.deletePlaylist(playlistId);
      // TODO: add notification successfully deleted
      await this.router.navigate(['/library']);
    } catch (error) {
      console.error('[deletePlaylistById]', error);
    }
  }
}
