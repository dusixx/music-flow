import { Injectable } from '@angular/core';
import { Track } from '@app/shared/models/track';
import { mapTrack } from './track.mapper';
import { tracks } from './tracks.mock';

// TODO: replace when the base API service is implemented

@Injectable({
  providedIn: 'root',
})
export class TrackService {
  getPopular(/* pagination params */): Track[] {
    return tracks.slice(0, 15).map(mapTrack);
  }
  getNewReleases(/* pagination params */) {
    return tracks.slice(16, 26).map(mapTrack);
  }
}
