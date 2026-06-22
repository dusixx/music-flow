import { inject, Injectable } from '@angular/core';
import { JamendoPaginationParams } from '@api/jamendo/jamendo.types';
import { TrackService } from '@api/track/track-service';
import { Track } from '@api/track/track.model';
import { JamendoStore } from '@app/core/api/store/jamendo-store';

@Injectable()
export class PopularStore extends JamendoStore<Track> {
  protected readonly trackService = inject(TrackService);

  protected override fetchData(params: JamendoPaginationParams) {
    return this.trackService.getPopular(params);
  }
}
