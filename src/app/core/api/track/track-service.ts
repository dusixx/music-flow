import { inject, Service } from '@angular/core';
import { JamendoService } from '@api/jamendo/jamendo-service';
import { createKeyByQueryParams } from '@app/shared/utils/object.utils';
import { map, of, tap } from 'rxjs';
import { TrackCacheService } from '../cache/entity-cache';
import {
  JamendoPaginationParams,
  JamendoSearchParams,
  SearchParams,
} from '../jamendo/jamendo.types';
import { createJamendoResponseHandler } from '../jamendo/utils/handle-jamendo-response';
import { mapSearchParamsToJamendoSearchParams } from '../jamendo/utils/map-search-params-to-jamendo';
import { TrackDto } from './track.dto';
import { mapTrack } from './track.mapper';

@Service()
export class TrackService {
  private jamendoService = inject(JamendoService);
  private cache = inject(TrackCacheService);

  private responseHandler = createJamendoResponseHandler(mapTrack);

  getPopular(params?: JamendoPaginationParams) {
    const queryParams = {
      ...params,
      order: 'popularity_month',
    };
    return this.searchRaw(queryParams);
  }

  getNewReleases(params?: JamendoPaginationParams) {
    const queryParams = {
      ...params,
      order: 'releasedate_desc',
    };
    return this.searchRaw(queryParams);
  }

  search(params: SearchParams) {
    const jamendoParams = mapSearchParamsToJamendoSearchParams(params);
    return this.searchRaw(jamendoParams);
  }

  searchRaw(params: JamendoSearchParams) {
    const queryParams = {
      ...params,
      fullcount: true,
      include: 'stats+musicinfo',
    };
    const key = createKeyByQueryParams(queryParams, 'search');

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

  // getTracksByIds(ids: string[]) {
  //   if (!ids.length) return of([]);
  //   const queryParams = {
  //     id: ids.join('+'),
  //     include: 'stats+musicinfo',
  //   };
  //   const key = createCacheKey(queryParams, 'tracks-by-ids');
  //   if (this.cache.has(key)) {
  //     // return of(this.cache.get(key)!);
  //   }
  //   return this.jamendoService.get<TrackDto>('tracks', queryParams).pipe(
  //     map(this.responseHandler),
  //     tap((resp) => {
  //       this.cache.set(key, resp);
  //     }),
  //     map((resp: JamendoResult<Track>) => {
  //       const tracks = resp.results;
  //       return [...tracks].sort((a: Track, b: Track) => ids.indexOf(a.id) - ids.indexOf(b.id));
  //     })
  //   );
  // }
}
