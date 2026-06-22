import { Service } from '@angular/core';
import { Artist } from '@api/artist/artist.model';
import { JamendoSimpleCacheService } from './jamendo-simple-cache';

@Service()
export class ArtistCacheService extends JamendoSimpleCacheService<Artist> {}
