import { inject, Service } from '@angular/core';
import { JamendoService } from '@api/jamendo/jamendo-service';
import { map, of, tap } from 'rxjs';
import { createCacheKey } from '../cache/jamendo-cache.utils';
import { JamendoPaginationParams, JamendoSearchParams } from '../jamendo/jamendo.types';
import { createJamendoResponseHandler } from '../jamendo/utils/handle-jamendo-response';
// import { SearchParams } from './track-service.types';
import { TrackCacheService } from '../cache/entity-cache';
import { TrackDto } from './track.dto';
import { mapTrack } from './track.mapper';
// import { parseSearchParams } from './utils/parse-search-params';

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

  search(params: JamendoSearchParams) {
    const queryParams = {
      ...params,
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
}
