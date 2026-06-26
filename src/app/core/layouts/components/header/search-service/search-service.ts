import { inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { JamendoPaginationParams } from '@app/core/api/jamendo/jamendo.types';
import { SearchQuery } from '@app/shared/models/types/common.types';
import { delay, distinctUntilChanged, filter, map, of, startWith, switchMap } from 'rxjs';

const DEBOUNCE_DELAY = 350;

type QueryAndPagination = SearchQuery & JamendoPaginationParams;

@Injectable()
export class SearchService {
  private readonly router = inject(Router);

  readonly query = signal('');

  constructor() {
    this.syncQueryWithUrl();
    this.watchSearchQuery();
  }

  private syncQueryWithUrl() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.getQueryFromUrl()),
        startWith(this.getQueryFromUrl()),
        takeUntilDestroyed()
      )
      .subscribe((q) => {
        if (this.query().trim() !== q) {
          this.query.set(q);
        }
      });
  }

  private watchSearchQuery() {
    toObservable(this.query)
      .pipe(
        map((query) => query.trim()),
        filter((query) => query !== this.getQueryFromUrl()),
        distinctUntilChanged(),
        switchMap((query) => of(query).pipe(delay(query ? DEBOUNCE_DELAY : 0))),
        takeUntilDestroyed()
      )
      .subscribe((query) => {
        this.navigate(query);
      });
  }

  private getQueryFromUrl() {
    const params = this.router.parseUrl(this.router.url).queryParams as SearchQuery;
    return params.q?.trim() ?? '';
  }

  private navigate(query: string) {
    this.router.navigate(['/search'], {
      queryParams: {
        q: query || null,
        offset: null,
      } satisfies QueryAndPagination,
      queryParamsHandling: 'merge',
    });
  }
}
