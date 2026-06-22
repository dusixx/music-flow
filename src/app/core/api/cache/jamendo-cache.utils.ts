import { EntityWithId, QueryParams } from '../common.types';
import { normalizeQueryParams } from '../jamendo/utils/normalize-query-params';

export const createCacheKey = (params: QueryParams, prefix?: string) => {
  const pairs = Object.entries(normalizeQueryParams(params)).map(([k, v]) => `${k}=${v}`);
  if (prefix) {
    pairs.unshift(prefix);
  }
  return pairs.join(':');
};

export const dedupeById = <T extends EntityWithId>(items: T[]) => {
  const exists = new Set<string>();

  return items.filter(({ id }) => {
    if (!exists.has(id)) {
      exists.add(id);
      return true;
    }
    return false;
  });
};
