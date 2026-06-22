import { Service } from '@angular/core';
import { Track } from '@api/track/track.model';
import { JamendoSimpleCacheService } from './jamendo-simple-cache';

@Service()
export class TrackCacheService extends JamendoSimpleCacheService<Track> {}
