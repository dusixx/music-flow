import { QueryParams } from '../common.types';
import { normalizeQueryParams } from '../jamendo/utils/normalize-query-params';

export const createCacheKey = (params: QueryParams, prefix?: string): string => {
  const pairs = Object.entries(normalizeQueryParams(params)).map(([k, v]) => `${k}=${v}`);
  if (prefix) {
    pairs.unshift(prefix);
  }
  return pairs.join(':');
};
