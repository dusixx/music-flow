import { inject, Service, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { delay, distinctUntilChanged, of, switchMap } from 'rxjs';

const DEBOUNCE_DELAY = 350;
const QUERY_PARAM_NAME = 'q';

@Service()
export class SearchService {
  private readonly router = inject(Router);

  query = signal('');

  // queryParamMap = toSignal(
  //   this.router.events.pipe(
  //     filter((event) => event instanceof NavigationEnd),
  //     map(() => this.getQueryParamMap())
  //   ),
  //   { initialValue: this.getQueryParamMap() }
  // );

  constructor() {
    // this.syncQueryWithUrl();
    this.watchSearchQuery();
  }

  // private getQueryParamMap() {
  //   return this.router.parseUrl(this.router.url).queryParamMap;
  // }

  // private syncQueryWithUrl() {
  //   effect(() => {
  //     const urlQuery = this.queryParamMap().get(QUERY_PARAM_NAME) ?? '';
  //     const query = untracked(() => this.query());

  //     if (query !== urlQuery) {
  //       this.query.set(urlQuery);
  //     }
  //   });
  // }

  private watchSearchQuery() {
    toObservable(this.query)
      .pipe(
        distinctUntilChanged(),
        switchMap((query) => of(query).pipe(delay(query.trim() ? DEBOUNCE_DELAY : 0))),
        takeUntilDestroyed()
      )
      .subscribe((query) => {
        this.navigateOnQueryChange(query);
      });
  }

  // navigate(query: string) {
  //   const urlTree: UrlTree = this.router.createUrlTree(['/search'], { queryParams: { query } });
  //   this.router.navigateByUrl(urlTree);
  // }

  private navigateOnQueryChange(queryStr: string) {
    const query = queryStr.trim();

    if (!query) {
      return;
    }
    this.router.navigate(['/search'], {
      queryParams: {
        [QUERY_PARAM_NAME]: query || null,
      },
      queryParamsHandling: 'merge',
    });
  }
}
