import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { JamendoSearchParams } from '@app/core/api/jamendo/jamendo.types';
import { mapParamMapToSearchParams } from '@app/core/api/jamendo/utils/map-param-map-to-search';
import { mapSearchParamsToJamendoSearchParams } from '@app/core/api/jamendo/utils/map-search-params-to-jamendo';
import { TrackService } from '@app/core/api/track/track-service';
import { Track } from '@app/core/api/track/track.model';
import { getErrorMessage } from '@app/shared/utils/error.utils';
import { dedupeById } from '@app/shared/utils/object.utils';

const OFFSET_MIN = 0;
const LIMIT_MIN = 1;

interface NavigatePpops {
  params?: JamendoSearchParams;
  loadMore?: boolean;
}

@Injectable()
export class SearchStore {
  private readonly trackService = inject(TrackService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private shouldAppend = false;

  private queryParamMap = toSignal(this.route.queryParamMap, {
    initialValue: this.route.snapshot.queryParamMap,
  });
  searchParams = computed(() => {
    return mapParamMapToSearchParams(this.queryParamMap());
  });
  jamendoSearchParams = computed(() => {
    return mapSearchParamsToJamendoSearchParams(this.searchParams());
  });

  private readonly resource = rxResource({
    params: () => this.jamendoSearchParams(),

    stream: ({ params }) => {
      return this.trackService.searchRaw({
        ...params,
        limit: this.searchParams().limit,
        offset: this.searchParams().offset,
      });
    },
  });
  error = this.resource.error;
  loading = this.resource.isLoading;

  results = signal<Track[]>([]);
  hasMore = signal(false);
  totalCount = signal(0);

  constructor() {
    this.syncState();
    this.syncResults();
    this.handleError();
  }

  private handleError() {
    effect(() => {
      if (this.error()) {
        // TODO: show toast
        console.debug(getErrorMessage(this.error()));
      }
    });
  }

  private syncState() {
    effect(() => {
      if (!this.resource.hasValue()) {
        return;
      }
      const value = this.resource.value();
      if (value) {
        this.hasMore.set(value.hasMore);
        this.totalCount.set(value.total ?? 0);
      }
    });
  }

  private syncResults() {
    effect(() => {
      if (!this.resource.hasValue()) {
        return;
      }
      const currentPageResults = this.resource.value()?.results;
      if (!currentPageResults) {
        return;
      }
      if (this.shouldAppend) {
        this.results.update((v) => dedupeById([...v, ...currentPageResults]));
        this.shouldAppend = false;
      } else {
        this.results.set(dedupeById(currentPageResults));
      }
    });
  }

  loadMore() {
    this.shouldAppend = true;
    this.navigate({ loadMore: true });
  }

  navigate({ params, loadMore }: NavigatePpops) {
    const limit = this.searchParams().limit ?? LIMIT_MIN;
    let offset = this.searchParams().offset ?? OFFSET_MIN;

    if (loadMore) {
      offset += limit;
    }
    this.router.navigate(['/search'], {
      queryParams: {
        limit,
        offset,
        ...params,
      } satisfies JamendoSearchParams,
      queryParamsHandling: 'merge',
    });
  }
}
