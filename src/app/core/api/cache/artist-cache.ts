import { Service } from '@angular/core';
import { Artist } from '@api/artist/artist.model';
import { JamendoCacheService } from './jamendo-cache';

@Service()
export class ArtistCacheService extends JamendoCacheService<Artist> {}
