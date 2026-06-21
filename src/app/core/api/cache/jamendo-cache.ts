import { JamendoResult } from '@api/jamendo/jamendo.types';
import { EntityWithId } from '@app/core/api/common.types';

type EntityId = string;

interface CacheEntry {
  data: JamendoResult<EntityId>;
  createdAt: number;
}

const DEFAULT_TTL = 24 * 60 * 60 * 1000;

export abstract class JamendoCacheService<TEntity extends EntityWithId> {
  private readonly pages = new Map<string, CacheEntry>();
  private readonly items = new Map<string, TEntity>();

  private _ttl = DEFAULT_TTL;

  private isExpired({ createdAt }: CacheEntry) {
    return Date.now() - createdAt >= this.ttl;
  }

  set ttl(v: number) {
    const num = ~~v;
    this._ttl = num < 0 ? Infinity : num;
  }

  get ttl() {
    return this._ttl;
  }

  set(pageId: string, data: JamendoResult<TEntity>) {
    const { results, hasMore } = data;
    const unique = new Set<string>();
    const ids: string[] = [];

    results.forEach((item) => {
      const { id } = item;

      if (unique.has(id)) {
        return;
      }
      this.items.set(id, item);
      ids.push(id);
      unique.add(id);
    });
    this.pages.set(pageId, {
      data: { results: ids, hasMore },
      createdAt: Date.now(),
    });
  }

  get(pageId: string): JamendoResult<TEntity> | null {
    const entry = this.pages.get(pageId);

    if (!entry) {
      return null;
    }
    const result = {
      results: entry.data.results.map((id) => this.items.get(id)!),
      hasMore: entry.data.hasMore,
    };
    if (this.isExpired(entry)) {
      this.remove(pageId);
    }
    return result;
  }

  has(pageId: string) {
    return this.pages.has(pageId);
  }

  remove(pageId: string) {
    const page = this.pages.get(pageId);
    page?.data.results.forEach((id) => this.items.delete(id));
    return this.pages.delete(pageId);
  }

  clear() {
    this.pages.clear();
    this.items.clear();
  }
}
