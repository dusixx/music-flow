import { signal } from '@angular/core';
import { EntityWithId } from '@app/core/api/common.types';
import { JamendoPaginationParams, JamendoResult } from '@app/core/api/jamendo/jamendo.types';
import { getErrorMessage } from '@app/shared/utils/error.utils';
import { finalize, Observable } from 'rxjs';
import { dedupeById } from '../cache/jamendo-cache.utils';

const DEFAULT_LIMIT = 10;

export abstract class JamendoStore<
  TEntity extends EntityWithId,
  TLoaderParams extends JamendoPaginationParams = JamendoPaginationParams,
> {
  protected abstract fetchData(params: TLoaderParams): Observable<JamendoResult<TEntity>>;

  private currentOffset = 0;
  private currentLimit = DEFAULT_LIMIT;
  private lastParams: TLoaderParams | null = null;

  results = signal<TEntity[]>([]);
  error = signal('');
  loading = signal(false);
  hasMore = signal(false);

  private updateResults(arr: TEntity[], append = false) {
    if (append) {
      this.results.update((cur) => dedupeById([...cur, ...arr]));
    } else {
      this.results.set(dedupeById(arr));
    }
  }

  loadMore() {
    if (!this.hasMore() || !this.lastParams) {
      return;
    }
    this.lastParams.limit = this.currentLimit;
    this.lastParams.offset = this.currentOffset + this.currentLimit;
    this.load(this.lastParams);
  }

  load(params: TLoaderParams) {
    const { limit, offset } = params;

    this.currentLimit = Math.max(~~Number(limit) || 0, DEFAULT_LIMIT);
    this.currentOffset = Math.max(~~Number(offset) || 0, 0);

    this.loading.set(true);
    this.error.set('');

    this.fetchData({ limit, offset, ...params })
      .pipe(
        finalize(() => {
          this.loading.set(false);
        })
      )
      .subscribe({
        next: ({ results, hasMore }) => {
          this.updateResults(results, this.lastParams === params);
          this.hasMore.set(hasMore);
        },
        error: (err: unknown) => {
          this.error.set(getErrorMessage(err));
          this.lastParams = null;
        },
        complete: () => {
          this.lastParams = params;
        },
      });
  }
}
