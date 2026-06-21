import { Service } from '@angular/core';
import { Track } from '@api/track/track.model';
import { JamendoCacheService } from './jamendo-cache';

@Service()
export class TrackCacheService extends JamendoCacheService<Track> {}
