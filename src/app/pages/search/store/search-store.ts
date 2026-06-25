import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { JamendoSearchParams } from '@app/core/api/jamendo/jamendo.types';
import { mapParamMapToSearchParams } from '@app/core/api/jamendo/utils/map-param-map-to-search';
import { mapSearchParamsToJamendoSearchParams } from '@app/core/api/jamendo/utils/map-search-params-to-jamendo';
import { TrackService } from '@app/core/api/track/track-service';
import { Track } from '@app/core/api/track/track.model';
import { dedupeById } from '@app/shared/utils/object.utils';

const DEFAULT_LIMIT = 40;

@Injectable()
export class SearchStore {
  private readonly trackService = inject(TrackService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private shouldAppend = true;

  private queryParamMap = toSignal(this.route.queryParamMap, {
    initialValue: this.route.snapshot.queryParamMap,
  });

  searchParams = computed(() => mapParamMapToSearchParams(this.queryParamMap()));

  jamendoSearchParams = computed(() => mapSearchParamsToJamendoSearchParams(this.searchParams()));

  private offset = this.jamendoSearchParams().offset ?? 0;
  private limit = this.jamendoSearchParams().limit ?? DEFAULT_LIMIT;

  private readonly resource = rxResource({
    params: () => this.jamendoSearchParams(),

    stream: ({ params }) => {
      return this.trackService.search({
        ...params,
        limit: this.limit,
        offset: this.offset,
      });
    },
  });
  results = signal<Track[]>([]);
  error = this.resource.error;
  loading = this.resource.isLoading;
  hasMore = computed(() => this.resource.value()?.hasMore ?? false);
  totalCount = computed(() => this.resource.value()?.total ?? 0);

  constructor() {
    effect(() => {
      const currentPageResults = this.resource.value()?.results;
      if (!currentPageResults) {
        return;
      }
      if (this.shouldAppend) {
        this.results.update((v) => dedupeById([...v, ...currentPageResults]));
        this.shouldAppend = false;
      } else {
        this.resetOffset();
        this.results.set(dedupeById(currentPageResults));
      }
    });
  }

  loadMore() {
    this.shouldAppend = true;
    this.offset += this.limit;
    this.navigate();
  }

  // FIX: double request - with current offset and next with 0
  resetOffset() {
    this.offset = 0;
    this.router.navigate([], {
      queryParams: {
        offset: null,
      } satisfies JamendoSearchParams,
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  navigate(params?: JamendoSearchParams) {
    this.router.navigate(['/search'], {
      queryParams: {
        ...params,
        limit: this.limit,
        offset: this.offset || null,
      } satisfies JamendoSearchParams,
      queryParamsHandling: 'merge',
    });
  }
}
