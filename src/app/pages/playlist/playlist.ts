import { ChangeDetectionStrategy, Component, inject, input, resource } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { TrackService } from '@core/api/tracks/track-service';
import { PlaylistApiService } from '@core/services/playlist/playlist-api-service';
import { of } from 'rxjs';

@Component({
  selector: 'player-playlist',
  imports: [],
  templateUrl: './playlist.html',
  styleUrl: './playlist.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PlaylistApiService],
})
export class Playlist {
  private trackService = inject(TrackService);
  private playlistService = inject(PlaylistApiService);

  protected id = input.required<string>();

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
}
