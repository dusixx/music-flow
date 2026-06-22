import { JamendoResult } from '@api/jamendo/jamendo.types';
import { EntityWithId } from '@app/core/api/common.types';

interface CachePage {
  data: JamendoResult<string>;
  createdAt: number;
}

const DEFAULT_TTL = 24 * 60 * 60 * 1000;

export abstract class JamendoCacheService<TItem extends EntityWithId> {
  private readonly pages = new Map<string, CachePage>();
  private readonly items = new Map<string, TItem>();
  private readonly refs = new Map<string, number>();

  private _ttl = DEFAULT_TTL;

  private isExpired({ createdAt }: CachePage) {
    return Date.now() - createdAt >= this.ttl;
  }

  set ttl(v: number) {
    const num = parseFloat(`${v}`) || 0;
    this._ttl = num < 0 ? Infinity : num;
  }

  get ttl() {
    return this._ttl;
  }

  private addItem(id: string, item: TItem) {
    this.items.set(id, item);
    const refsCount = this.refs.get(id) ?? 0;
    this.refs.set(id, refsCount + 1);
  }

  set(pageId: string, data: JamendoResult<TItem>) {
    const { results, hasMore } = data;
    const unique = new Set<string>();
    const ids: string[] = [];

    this.remove(pageId);

    results.forEach((item) => {
      const { id } = item;

      if (!unique.has(id)) {
        unique.add(id);
        this.addItem(id, item);
        ids.push(id);
      }
    });
    this.pages.set(pageId, {
      data: { results: ids, hasMore },
      createdAt: Date.now(),
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
    const { results: ids, hasMore } = page.data;
    const results = ids.map((id) => this.items.get(id)).filter((v) => v != null);

    if (ids.length !== results.length) {
      this.remove(pageId);
      return null;
    }
    return {
      results,
      hasMore,
    };
  }

  has(pageId: string) {
    const page = this.pages.get(pageId);
    return !!(page && !this.isExpired(page));
  }

  remove(pageId: string) {
    const page = this.pages.get(pageId);
    if (!page) {
      return;
    }
    page.data.results.forEach((id) => {
      const refsCount = (this.refs.get(id) ?? 0) - 1;
      if (refsCount <= 0) {
        this.items.delete(id);
        this.refs.delete(id);
      } else {
        this.refs.set(id, refsCount);
      }
    });
    this.pages.delete(pageId);
  }

  clear() {
    this.pages.clear();
    this.items.clear();
    this.refs.clear();
  }
}
