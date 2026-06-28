import {
  JAMENDO_ALL_GENRES,
  JAMENDO_POPULARITY_PERIODS,
  JAMENDO_SORT_FIELDS,
  JAMENDO_SORT_ORDER,
} from '../jamendo.constants';
import {
  JamendoGenre,
  JamendoPopularityPeriod,
  JamendoSortField,
  JamendoSortOrder,
} from '../jamendo.types';

export const isJamendoGenre = (v: string): v is JamendoGenre => {
  const arr: string[] = [...JAMENDO_ALL_GENRES];
  return arr.includes(v);
};

export const isJamendoGenres = (v: string[]): v is JamendoGenre[] => {
  const exists = new Set<string>([...JAMENDO_ALL_GENRES]);
  return v.every((el) => exists.has(el));
};

export const isJamendoPopularityPeriod = (v: string): v is JamendoPopularityPeriod => {
  const arr: string[] = [...JAMENDO_POPULARITY_PERIODS];
  return arr.includes(v);
};

export const isJamendoSortField = (v: string): v is JamendoSortField => {
  const arr: string[] = [...JAMENDO_SORT_FIELDS];
  return arr.includes(v);
};

export const isJamendoSortOrder = (v: string): v is JamendoSortOrder => {
  const arr: string[] = [...JAMENDO_SORT_ORDER];
  return arr.includes(v);
};
