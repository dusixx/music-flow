import { effect, inject, Injectable } from '@angular/core';
import { JamendoSearchParams } from '@app/core/api/jamendo/jamendo.types';
import { SearchService } from '@app/core/services/search/search-service';
import { JamendoStore } from '../../../core/api/store/jamendo-store';
import { TrackService } from '../../../core/api/track/track-service';
// import { SearchParams } from '../../../core/api/track/track-service.types';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Track } from '../../../core/api/track/track.model';
import { paramMapToPlainObject } from './search-store.utils';

const DEFAULT_LIMIT = 20;

@Injectable()
export class SearchStore extends JamendoStore<Track, JamendoSearchParams> {
  private readonly searchService = inject(SearchService);
  private readonly trackService = inject(TrackService);
  private route = inject(ActivatedRoute);

  queryParamMap = toSignal(this.route.queryParamMap, {
    initialValue: this.route.snapshot.queryParamMap,
  });

  constructor() {
    super();
    effect(() => {
      const queryParams = paramMapToPlainObject<JamendoSearchParams & { q: string }>(
        this.queryParamMap()
      );
      const query = queryParams.q?.[0] ?? '';
      if (!query) {
        return;
      }
      console.debug('query', query);
      this.load({ search: query, limit: DEFAULT_LIMIT });
    });
  }

  protected override fetchData(params: JamendoSearchParams) {
    return this.trackService.search(params);
  }
}
