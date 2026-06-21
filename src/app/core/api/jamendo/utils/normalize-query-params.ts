import { QueryParams } from '../../common.types';

export const normalizeQueryParams = (params: QueryParams) => {
  return Object.fromEntries(
    Object.entries(params)
      .filter(([_, v]) => v != null)
      .sort(([a], [b]) => a.localeCompare(b))
  );
};
