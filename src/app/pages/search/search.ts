import { Component, computed, effect, inject, signal, untracked } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import {
  JAMENDO_MAIN_GENRES,
  JAMENDO_POPULARITY_PERIODS,
  JAMENDO_SORT_FIELDS,
} from '@app/core/api/jamendo/jamendo.constants';
import { JamendoGenre, SearchParams } from '@app/core/api/jamendo/jamendo.types';
import { mapSearchParamsToJamendoSearchParams } from '@app/core/api/jamendo/utils/map-search-params-to-jamendo';
import { SearchStore } from '@app/pages/search/store/search-store';
import { Button } from '@app/shared/components/button/button';
import { ToggleGroup } from '@app/shared/components/toggle-group/toggle-group';
import { DurationPipe } from '@app/shared/pipes/duration-pipe';
import { clamp } from '@app/shared/utils/number.utils';
import { TrackCard } from '@shared/components/track-card/track-card';
import { TuiButtonX, TuiDropdown, TuiTextfield } from '@taiga-ui/core';
import { TuiChevron, TuiDataListWrapper, TuiRange, TuiSelect } from '@taiga-ui/kit';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import {
  DEBOUNCE_DELAY,
  DURATION_MAX,
  PER_PAGE_MAX,
  PER_PAGE_MIN,
  PER_PAGE_VALUES,
} from './search.constants';
import { clampDuration } from './search.utils';

type Duration = NonNullable<SearchParams['durationRange']>;
type SortField = SearchParams['sortBy'];
type PopularityPeriod = SearchParams['popularityPeriod'];

// TODO: handle error correctly, show toast

@Component({
  selector: 'player-search',
  imports: [
    TrackCard,
    Button,
    ToggleGroup,
    TuiTextfield,
    TuiSelect,
    TuiDropdown,
    TuiChevron,
    TuiDataListWrapper,
    FormsModule,
    Button,
    TuiButtonX,
    TuiRange,
    DurationPipe,
  ],
  providers: [SearchStore],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {
  protected readonly searchStore = inject(SearchStore);

  protected readonly genreValues = JAMENDO_MAIN_GENRES;
  protected readonly sortByValues = JAMENDO_SORT_FIELDS;
  protected readonly popularityPeriodValues = JAMENDO_POPULARITY_PERIODS;
  protected readonly maxDuration = DURATION_MAX;
  protected readonly perPageValues = PER_PAGE_VALUES;

  private firstRun = true;

  protected emptyMessage = computed(() => {
    const { loading, totalCount } = this.searchStore;
    if (loading()) {
      return 'Loading...';
    } else if (!totalCount()) {
      return 'Nothing found. Please try different settings...';
    }
    return "There's nothing here yet";
  });

  private searchParamsFromUrl = this.searchStore.searchParams();

  protected genres = signal<JamendoGenre[]>(this.searchParamsFromUrl.genres ?? []);
  protected debouncedGenres = toSignal(
    toObservable(this.genres).pipe(distinctUntilChanged(), debounceTime(DEBOUNCE_DELAY)),
    { initialValue: this.genres() }
  );

  protected durationRange = signal<Duration>(
    clampDuration(this.searchParamsFromUrl.durationRange, this.maxDuration)
  );
  protected debouncedDurationRange = toSignal(
    toObservable(this.durationRange).pipe(distinctUntilChanged(), debounceTime(DEBOUNCE_DELAY)),
    { initialValue: this.durationRange() }
  );

  protected sortBy = signal<SortField | null>(this.searchParamsFromUrl.sortBy);
  protected ascOrder = signal<boolean>(this.searchParamsFromUrl.sortOrder !== 'desc');

  protected popularityPeriod = signal<PopularityPeriod | null>(
    this.searchParamsFromUrl.popularityPeriod ?? 'total'
  );

  protected perPage = signal<number>(
    clamp(this.searchParamsFromUrl.limit || 0, PER_PAGE_MIN, PER_PAGE_MAX)
  );

  private jamendoSearchParams = computed(() => {
    const { sortBy, durationRange, popularityPeriod, ascOrder, genres } = this;

    return mapSearchParamsToJamendoSearchParams({
      offset: this.searchParamsFromUrl.offset,
      genres: genres()?.length ? genres() : null,
      durationRange: durationRange(),
      sortBy: sortBy(),
      sortOrder: ascOrder() ? 'asc' : 'desc',
      popularityPeriod: popularityPeriod(),
      limit: this.perPage(),
    });
  });

  constructor() {
    this.watchFilterParams();
  }

  private watchFilterParams() {
    effect(() => {
      this.debouncedDurationRange();
      this.debouncedGenres();
      this.sortBy();
      this.popularityPeriod();
      this.ascOrder();
      this.perPage();

      untracked(() => this.navigate());
    });
  }

  private navigate() {
    const params = this.jamendoSearchParams();
    if (!this.firstRun) {
      params.offset = null;
    }
    this.searchStore.navigate({ params });
    this.firstRun = false;
  }
}
