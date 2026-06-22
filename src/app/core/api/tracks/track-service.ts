import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { mapTrack } from './track.mapper';
import { tracks } from './tracks.mock';

// TODO: replace when the base API service is implemented

@Injectable({
  providedIn: 'root',
})
export class TrackService {
  getPopular(/* pagination params */) {
    return of(tracks.slice(0, 15).map(mapTrack));
  }
  getNewReleases(/* pagination params */) {
    return of(tracks.slice(16, 31).map(mapTrack));
  }
  getTracksByIds(ids: string[]) {
    const idSet = new Set(ids);
    const filteredTracks = tracks.filter((track) => idSet.has(track.id));
    return of(filteredTracks.map(mapTrack));
  }
}
