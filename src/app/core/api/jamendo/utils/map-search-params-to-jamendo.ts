import { JAMENDO_MULTI_VALUES_SEPARATOR as MULTI_SEP } from '../jamendo.constants';
import { JamendoSearchParams, SearchParams } from '../jamendo.types';

type SortParams = Pick<SearchParams, 'sortBy' | 'sortOrder'>;

const getOrder = ({ sortBy, sortOrder }: SortParams) => {
  const result = sortBy && sortOrder === 'desc' ? `${sortBy}_${sortOrder}` : sortBy;
  return result ?? null;
};

export const mapSearchParamsToJamendoSearchParams = (params: SearchParams): JamendoSearchParams => {
  const {
    query,
    genres,
    durationRange,
    sortBy,
    sortOrder = 'asc',
    popularityPeriod,
    offset,
    limit,
    fuzzy = true,
  } = params;
  const durFrom = durationRange?.[0] ?? 0;
  const durTo = durationRange?.[1] ?? 0;
  const isValidDurationRange = durFrom >= 0 && durFrom <= durTo;

  return {
    search: query?.trim() ?? null,
    tags: !fuzzy ? genres?.join(MULTI_SEP) || null : null,
    fuzzytags: fuzzy ? genres?.join(MULTI_SEP) || null : null,
    durationbetween: isValidDurationRange ? `${durFrom}_${durTo}` : null,
    order: getOrder({ sortBy, sortOrder }),
    boost: popularityPeriod ? `popularity_${popularityPeriod}` : null,
    offset: offset ?? null,
    limit: limit ?? null,
  };
};
