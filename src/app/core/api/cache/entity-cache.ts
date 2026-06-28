import { Service } from '@angular/core';
import { Album } from '@api/album/album.model';
import { Artist } from '../artist/artist.model';
import { Track } from '../track/track.model';
import { JamendoSimpleCacheService } from './jamendo-simple-cache';

@Service()
export class AlbumCacheService extends JamendoSimpleCacheService<Album> {}

@Service()
export class ArtistCacheService extends JamendoSimpleCacheService<Artist> {}

@Service()
export class TrackCacheService extends JamendoSimpleCacheService<Track> {}
