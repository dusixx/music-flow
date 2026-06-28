import { inject, Service } from '@angular/core';
import { JamendoService } from '@api/jamendo/jamendo-service';
import { TrackCacheService } from '@app/core/api/cache/track-cache';
import { map, of, tap } from 'rxjs';
import { createCacheKey } from '../cache/cache.utils';
import { JamendoPaginationParams, JamendoResult } from '../jamendo/jamendo.types';
import { createJamendoResponseHandler } from '../jamendo/utils/handle-jamendo-response';
import { SearchParams } from './track-service.types';
import { TrackDto } from './track.dto';
import { mapTrack } from './track.mapper';
import { parseSearchParams } from './utils/parse-search-params';
import { Track } from './track.model';

@Service()
export class TrackService {
  private jamendoService = inject(JamendoService);
  private cache = inject(TrackCacheService);

  private responseHandler = createJamendoResponseHandler(mapTrack);

  getPopular(params?: JamendoPaginationParams) {
    const queryParams = {
      ...params,
      order: 'popularity_month',
      include: 'stats+musicinfo',
    };
    const key = createCacheKey(queryParams, 'popular');

    if (this.cache.has(key)) {
      return of(this.cache.get(key)!);
    }
    return this.jamendoService.get<TrackDto>('tracks', queryParams).pipe(
      map(this.responseHandler),
      tap((resp) => {
        this.cache.set(key, resp);
      })
    );
  }

  getNewReleases(params?: JamendoPaginationParams) {
    const queryParams = {
      ...params,
      order: 'releasedate_desc',
      include: 'stats+musicinfo',
    };
    const key = createCacheKey(queryParams, 'releases');

    if (this.cache.has(key)) {
      return of(this.cache.get(key)!);
    }
    return this.jamendoService.get<TrackDto>('tracks', queryParams).pipe(
      map(this.responseHandler),
      tap((resp) => {
        this.cache.set(key, resp);
      })
    );
  }

  search(params: SearchParams) {
    const queryParams = {
      ...parseSearchParams(params),
      include: 'stats+musicinfo',
    };
    const key = createCacheKey(queryParams, 'search');

    if (this.cache.has(key)) {
      return of(this.cache.get(key)!);
    }
    return this.jamendoService.get<TrackDto>('tracks', queryParams).pipe(
      map(this.responseHandler),
      tap((resp) => {
        this.cache.set(key, resp);
      })
    );
  }

  getTracksByIds(ids: string[]) {
    if (!ids.length) return of([]);
    const queryParams = {
      id: ids.join('+'),
      include: 'stats+musicinfo',
    };
    const key = createCacheKey(queryParams, 'tracks-by-ids');
    if (this.cache.has(key)) {
      // return of(this.cache.get(key)!);
    }
    return this.jamendoService.get<TrackDto>('tracks', queryParams).pipe(
      map(this.responseHandler),
      tap((resp) => {
        this.cache.set(key, resp);
      }),
      map((resp: JamendoResult<Track>) => {
        const tracks = resp.results;
        return [...tracks].sort((a: Track, b: Track) => ids.indexOf(a.id) - ids.indexOf(b.id));
      })
    );
  }
}
