import { Injectable } from '@angular/core';
import { Track } from '@app/shared/models/track';
import { TrackMapper } from './track-mapper';
import { tracks } from './tracks-mock';

// TODO: replace when the base API service is implemented

@Injectable({
  providedIn: 'root',
})
export class TrackService {
  getPopular(/* pagination params */): Track[] {
    return TrackMapper.mapTracks(tracks.slice(0, 15));
  }
  getNewReleases(/* pagination params */) {
    return TrackMapper.mapTracks(tracks.slice(16, 26));
  }
}
