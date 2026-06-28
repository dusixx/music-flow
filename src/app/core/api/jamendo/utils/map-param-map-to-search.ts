import { ParamMap } from '@angular/router';
import { SearchQuery } from '@app/shared/models/types/common.types';
import { paramMapToPlainObject } from '@app/shared/utils/object.utils';
import {
  JAMENDO_MULTI_VALUES_SEPARATOR as MULTI_SEP,
  JAMENDO_PAIR_VALUES_SEPARATOR as PAIR_SEP,
} from '../jamendo.constants';
import { JamendoGenre, JamendoSearchParams, SearchParams } from '../jamendo.types';
import {
  isJamendoGenre,
  isJamendoPopularityPeriod,
  isJamendoSortField,
  isJamendoSortOrder,
} from './type-guards';

type SearchQueryParams = Omit<JamendoSearchParams, 'search'> & SearchQuery;
type ParamObject = Record<string, string[] | undefined>;

const isPositiveInt = (s: string) => /^\d+$/.test(s);

const getGenres = (v?: string[]): JamendoGenre[] => {
  return (v?.[0] ?? '').split(MULTI_SEP).filter(isJamendoGenre);
};

const getLimitOffset = (v?: string[]): number | null => {
  const num = isPositiveInt(v?.[0] ?? '') ? Number(v?.[0]) : 0;
  return num || null;
};

const mapGenres = ({ fuzzytags, tags }: ParamObject): SearchParams => {
  const normTags = getGenres(tags);
  const normFuzzytags = getGenres(fuzzytags);
  const genres = normFuzzytags.length ? normFuzzytags : normTags;
  return {
    fuzzy: normFuzzytags.length > 0,
    genres: genres.length ? genres : null,
  };
};

const mapDuration = ({ durationbetween }: ParamObject): SearchParams => {
  const [from, to] = durationbetween?.[0].split(PAIR_SEP) ?? [];
  const isValidRange = isPositiveInt(from) && isPositiveInt(to) && Number(from) <= Number(to);
  return {
    durationRange: isValidRange ? [Number(from), Number(to)] : null,
  };
};

const mapLimitOffset = ({ limit, offset }: ParamObject): SearchParams => {
  return {
    limit: getLimitOffset(limit),
    offset: getLimitOffset(offset),
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
