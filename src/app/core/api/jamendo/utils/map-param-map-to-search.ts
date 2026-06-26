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

const mapGenres = ({
  fuzzytags,
  tags,
}: {
  fuzzytags?: string[];
  tags?: string[];
}): SearchParams => {
  const normTags = (tags?.[0] ?? '').split(MULTI_SEP).filter(isJamendoGenre);
  const normFuzzytags = (fuzzytags?.[0] ?? '').split(MULTI_SEP).filter(isJamendoGenre);
  const genres = normFuzzytags.length ? normFuzzytags : normTags;
  return {
    fuzzy: normFuzzytags.length > 0,
    genres: genres.length ? genres : null,
  };
};

const mapDuration = ({ durationbetween }: { durationbetween?: string[] }): SearchParams => {
  const [from, to] = durationbetween?.[0].split(PAIR_SEP) ?? [];
  const isValidDurationRange = isPositiveNum(from) && isPositiveNum(to) && +from <= +to;
  return {
    durationRange: isValidDurationRange ? [+from, +to] : null,
  };
};

const mapLimitOffset = ({
  limit,
  offset,
}: {
  limit?: string[];
  offset?: string[];
}): SearchParams => {
  const limitNum = isPositiveNum(limit?.[0] ?? '') ? Number(limit?.[0]) : 0;
  const offsetNum = isPositiveNum(offset?.[0] ?? '') ? Number(offset?.[0]) : 0;
  return {
    limit: limitNum || null,
    offset: offsetNum || null,
  };
};

const mapSortParams = ({ order, boost }: { order?: string[]; boost?: string[] }): SearchParams => {
  const [sortBy, sortOrder] = order?.[0].split(PAIR_SEP) ?? [];
  const [, popularityPeriod] = boost?.[0].split(PAIR_SEP) ?? [];
  return {
    sortBy: isJamendoSortField(sortBy) ? sortBy : null,
    sortOrder: isJamendoSortOrder(sortOrder) ? sortOrder : null,
    popularityPeriod: isJamendoPopularityPeriod(popularityPeriod) ? popularityPeriod : null,
  };
};

export const mapParamMapToSearchParams = (paramMap: ParamMap): SearchParams => {
  const { q, ...rest } = paramMapToPlainObject<SearchQueryParams>(paramMap);
  return {
    query: q?.[0] ?? null,
    ...mapSortParams(rest),
    ...mapLimitOffset(rest),
    ...mapGenres(rest),
    ...mapDuration(rest),
  };
};
