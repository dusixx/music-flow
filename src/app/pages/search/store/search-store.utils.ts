import { ParamMap } from '@angular/router';

export const paramMapToPlainObject = <T = Record<string, unknown>>(paramMap: ParamMap) => {
  const obj: Partial<Record<keyof T, string[]>> = {};

  return paramMap.keys.reduce<Partial<Record<keyof T, string[]>>>((res, v) => {
    res[v as keyof T] = paramMap.getAll(v);
    return res;
  }, obj);
};
