import { EntityWithId } from '@app/shared/models/types/common.types';
import { JamendoResult } from '../jamendo/jamendo.types';

export interface CachePage<TItem = EntityWithId> {
  data: JamendoResult<TItem>;
  createdAt: number;
}

const DEFAULT_TTL = 24 * 60 * 60 * 1000;

export abstract class JamendoSimpleCacheService<TItem extends EntityWithId> {
  private readonly pages = new Map<string, CachePage<TItem>>();

  private _ttl = DEFAULT_TTL;

  set ttl(v: number) {
    const num = parseFloat(`${v}`) || 0;
    this._ttl = num < 0 ? Infinity : num;
  }

  get ttl() {
    return this._ttl;
  }

  private isExpired({ createdAt }: CachePage) {
    return Date.now() - createdAt >= this.ttl;
  }

  private dedupe(results: TItem[]) {
    const existing = new Set<string>();

    return results.filter(({ id }) => {
      const isUnique = !existing.has(id);
      if (isUnique) {
        existing.add(id);
      }
      return isUnique;
    });
  }

  set(pageId: string, data: JamendoResult<TItem>) {
    this.pages.set(pageId, {
      createdAt: Date.now(),
      data: {
        results: this.dedupe(data.results),
        hasMore: data.hasMore,
      },
    });
  }

  get(pageId: string): JamendoResult<TItem> | null {
    const page = this.pages.get(pageId);
    if (!page) {
      return null;
    }
    if (this.isExpired(page)) {
      this.remove(pageId);
      return null;
    }

    return {
      results: page.data.results,
      hasMore: page.data.hasMore,
    };
  }

  has(pageId: string) {
    const page = this.pages.get(pageId);
    return !!(page && !this.isExpired(page));
  }

  remove(pageId: string) {
    this.pages.delete(pageId);
  }

  clear() {
    this.pages.clear();
  }

  removeExpired() {
    for (const [id, page] of this.pages.entries()) {
      if (this.isExpired(page)) {
        this.pages.delete(id);
      }
    }
  }
}
