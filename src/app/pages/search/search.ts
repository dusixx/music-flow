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
import { TrackCard } from '@shared/components/track-card/track-card';
import { TuiButtonX, TuiDropdown, TuiTextfield } from '@taiga-ui/core';
import { TuiChevron, TuiDataListWrapper, TuiRange, TuiSelect } from '@taiga-ui/kit';
import { debounceTime, distinctUntilChanged } from 'rxjs';

const DURATION_MIN = 0;
const DURATION_MAX = 1800;
const DURATION_DEFAULT = 900;
const DEBOUNCE_DELAY = 500;

type Duration = SearchParams['durationRange'];
type SortField = SearchParams['sortBy'];
type PopularityPeriod = SearchParams['popularityPeriod'];

// TODO: spinner overlay

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
  protected readonly minDuration = DURATION_MIN;
  protected readonly maxDuration = DURATION_MAX;

  protected emptyMessage = computed(() => {
    const totalCount = this.searchStore.totalCount();
    const loading = this.searchStore.loading();
    if (loading) {
      return 'Loading...';
    } else if (!totalCount) {
      // TODO: show image
      return 'Nothing found. Please try different settings...';
    }
    return "There's nothing here yet";
  });

  protected shouldShowLoadMore = computed(() => {
    const { hasMore, loading, results } = this.searchStore;
    return results().length && (loading() || hasMore());
  });

  private searchParamsFromUrl = this.searchStore.searchParams();

  protected sortBy = signal<SortField | null>(this.searchParamsFromUrl.sortBy);

  protected popularityPeriod = signal<PopularityPeriod | null>(
    this.searchParamsFromUrl.popularityPeriod ?? 'total'
  );
  protected durationRange = signal<NonNullable<Duration>>(
    this.searchParamsFromUrl.durationRange ?? [this.minDuration, DURATION_DEFAULT]
  );
  protected ascOrder = signal<boolean>(this.searchParamsFromUrl.sortOrder !== 'desc');
  protected genres = signal<JamendoGenre[]>(this.searchParamsFromUrl.genres ?? []);

  protected debouncedDurationRange = toSignal(
    toObservable(this.durationRange).pipe(distinctUntilChanged(), debounceTime(DEBOUNCE_DELAY)),
    { initialValue: this.durationRange() }
  );

  protected debouncedGenres = toSignal(
    toObservable(this.genres).pipe(distinctUntilChanged(), debounceTime(DEBOUNCE_DELAY)),
    { initialValue: this.genres() }
  );

  private jamendoSearchParams = computed(() => {
    const { sortBy, durationRange, popularityPeriod, ascOrder, genres } = this;

    return mapSearchParamsToJamendoSearchParams({
      genres: genres()?.length ? genres() : null,
      durationRange: durationRange(),
      sortBy: sortBy(),
      sortOrder: ascOrder() ? 'asc' : 'desc',
      popularityPeriod: popularityPeriod(),
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

      untracked(() => this.navigate());
    });
  }

  private navigate() {
    this.searchStore.navigate(this.jamendoSearchParams());
  }
}
