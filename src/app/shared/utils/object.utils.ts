import { ParamMap } from '@angular/router';
import { EntityWithId, QueryParams } from '../models/types/common.types';

export const isObject = (obj: unknown): obj is Record<string, unknown> => {
  return obj != null && typeof obj === 'object';
};

export const hasOwnKeys = <T extends object>(obj: unknown, ...keys: (keyof T)[]): obj is T => {
  return isObject(obj) && keys.every((key) => Object.hasOwn(obj, key));
};

export const paramMapToPlainObject = <T = Record<string, unknown>>(paramMap: ParamMap) => {
  const obj: Partial<Record<keyof T, string[]>> = {};

  return paramMap.keys.reduce<Partial<Record<keyof T, string[]>>>((res, v) => {
    res[v as keyof T] = paramMap.getAll(v);
    return res;
  }, obj);
};

export const normalizeQueryParams = (params: QueryParams) => {
  return Object.fromEntries(
    Object.entries(params)
      .filter(([_, v]) => v != null)
      .sort(([a], [b]) => a.localeCompare(b))
  );
};

export const createKeyByQueryParams = (params: QueryParams, prefix?: string) => {
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
