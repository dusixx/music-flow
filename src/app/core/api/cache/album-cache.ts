import { Service } from '@angular/core';
import { Album } from '@api/album/album.model';
import { JamendoSimpleCacheService } from './jamendo-simple-cache';

@Service()
export class AlbumCacheService extends JamendoSimpleCacheService<Album> {}
