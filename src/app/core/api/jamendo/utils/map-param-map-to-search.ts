import { ParamMap } from '@angular/router';
import { SearchQuery } from '@app/shared/models/types/common.types';
import { paramMapToPlainObject } from '@app/shared/utils/object.utils';
import {
  JAMENDO_MULTI_VALUES_SEPARATOR as MULTI_SEP,
  JAMENDO_PAIR_VALUES_SEPARATOR as PAIR_SEP,
} from '../jamendo.constants';
import { JamendoSearchParams, SearchParams } from '../jamendo.types';
import {
  isJamendoGenre,
  isJamendoPopularityPeriod,
  isJamendoSortField,
  isJamendoSortOrder,
} from './type-guards';

type SearchQueryParams = Omit<JamendoSearchParams, 'search'> & SearchQuery;

const isPositiveNum = (s: string) => /^\d+$/.test(s);

export const mapParamMapToSearchParams = (paramMap: ParamMap): SearchParams => {
  const { q, fuzzytags, tags, durationbetween, order, boost, limit, offset } =
    paramMapToPlainObject<SearchQueryParams>(paramMap);

  const normTags = (tags?.[0] ?? '').split(MULTI_SEP).filter(isJamendoGenre);
  const normFuzzytags = (fuzzytags?.[0] ?? '').split(MULTI_SEP).filter(isJamendoGenre);
  const fuzzy = normFuzzytags.length > 0;
  const genres = normFuzzytags.length ? normFuzzytags : normTags;

  const [from, to] = durationbetween?.[0].split(PAIR_SEP) ?? [];
  const isValidDurationRange = isPositiveNum(from) && isPositiveNum(to) && +from <= +to;

  const limitNum = isPositiveNum(limit?.[0] ?? '') ? Number(limit?.[0]) : 0;
  const offsetNum = isPositiveNum(offset?.[0] ?? '') ? Number(offset?.[0]) : 0;

  const [sortBy, sortOrder] = order?.[0].split(PAIR_SEP) ?? [];
  const [, popularityPeriod] = boost?.[0].split(PAIR_SEP) ?? [];

  return {
    query: q?.[0] ?? null,
    fuzzy,
    genres: genres.length ? genres : null,
    durationRange: isValidDurationRange ? [+from, +to] : null,
    sortBy: isJamendoSortField(sortBy) ? sortBy : null,
    sortOrder: isJamendoSortOrder(sortOrder) ? sortOrder : null,
    popularityPeriod: isJamendoPopularityPeriod(popularityPeriod) ? popularityPeriod : null,
    limit: limitNum || null,
    offset: offsetNum || null,
  };
};
