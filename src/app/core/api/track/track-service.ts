import { inject, Service } from '@angular/core';
import { JamendoService } from '@api/jamendo/jamendo-service';
import { TrackCacheService } from '@app/core/api/cache/track-cache';
import { map, of, tap } from 'rxjs';
import { QueryParams } from '../common.types';
import { JamendoPaginationParams } from '../jamendo/jamendo.types';
import { createJamendoResponseHandler } from '../jamendo/utils/handle-jamendo-response';
import { normalizeQueryParams } from '../jamendo/utils/normalize-query-params';
import { SearchParams } from './track-service.types';
import { TrackDto } from './track.dto';
import { mapTrack } from './track.mapper';
import { parseSearchParams } from './utils/parse-search-params';

@Service()
export class TrackService {
  private jamendoService = inject(JamendoService);
  private cache = inject(TrackCacheService);

  private responseHandler = createJamendoResponseHandler(mapTrack);

  private createCacheKey(params: QueryParams, prefix?: string): string {
    const pairs = Object.entries(normalizeQueryParams(params)).map(([k, v]) => `${k}=${v}`);
    if (prefix) {
      pairs.unshift(prefix);
    }
    return pairs.join(':');
  }

  getPopular(params?: JamendoPaginationParams) {
    const queryParams = {
      ...params,
      order: 'popularity_month',
      include: 'stats+musicinfo',
    };
    const key = this.createCacheKey(queryParams, 'popular');
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
    const key = this.createCacheKey(queryParams, 'releases');
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
    const key = this.createCacheKey(queryParams, 'search');
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
