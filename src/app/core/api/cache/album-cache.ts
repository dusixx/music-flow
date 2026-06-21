import { Service } from '@angular/core';
import { Album } from '@api/album/album.model';
import { JamendoCacheService } from './jamendo-cache';

@Service()
export class AlbumCacheService extends JamendoCacheService<Album> {}
