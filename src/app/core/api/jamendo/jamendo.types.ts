import { PartialNullable } from '@app/shared/models/types/common.types';
import {
  JAMENDO_ALL_GENRES,
  JAMENDO_POPULARITY_PERIODS,
  JAMENDO_SORT_FIELDS,
  JAMENDO_SORT_ORDER,
} from './jamendo.constants';

export type JamendoEndpoint = 'tracks' | 'artists' | 'albums';

export type JamendoResponseStatus = 'success' | 'failed';

export interface JamendoResponse<T> {
  headers: {
    status: JamendoResponseStatus;
    code: number;
    error_message: string;
    warnings: string;
    results_count: number;
    results_fullcount?: number;
    next?: string;
  };
  results: T[];
}

export interface JamendoResult<T> {
  hasMore: boolean;
  total?: number;
  results: T[];
}

export type JamendoPopularityPeriod = (typeof JAMENDO_POPULARITY_PERIODS)[number];
export type JamendoPopularity = `popularity_${JamendoPopularityPeriod}`;

export type JamendoSortField = (typeof JAMENDO_SORT_FIELDS)[number];
export type JamendoSortOrder = (typeof JAMENDO_SORT_ORDER)[number];

export type JamendoGenre = (typeof JAMENDO_ALL_GENRES)[number];

export type JamendoPaginationParams = PartialNullable<{
  limit: number;
  offset: number;
}>;

export type JamendoSearchParams = JamendoPaginationParams &
  PartialNullable<{
    search: string;
    fuzzytags: string;
    tags: string;
    durationbetween: string;
    order: string;
    boost: string;
  }>;

export type SearchParams = JamendoPaginationParams &
  PartialNullable<{
    query: string;
    genres: JamendoGenre[];
    fuzzy: boolean;
    durationRange: [number, number];
    sortBy: JamendoSortField;
    sortOrder: JamendoSortOrder;
    popularityPeriod: JamendoPopularityPeriod;
  }>;
