export const JAMENDO_DEFAULT_LIMIT = 10;
export const JAMENDO_MIN_LIMIT = 1;
export const JAMENDO_MULTI_VALUES_SEPARATOR = '+';
export const JAMENDO_PAIR_VALUES_SEPARATOR = '_';

export const JAMENDO_SORT_ORDER = ['asc', 'desc'] as const;
export const JAMENDO_POPULARITY_PERIODS = ['week', 'month', 'total'] as const;
export const JAMENDO_SORT_FIELDS = ['name', 'releasedate'] as const;

export const JAMENDO_MAIN_GENRES = [
  'pop',
  'rock',
  'electronic',
  'hiphop',
  'jazz',
  'classical',
  'metal',
  'latin',
  'rnb',
  'blues',
] as const;

export const JAMENDO_ALL_GENRES = [
  ...JAMENDO_MAIN_GENRES,
  'indie',
  'filmscore',
  'chillout',
  'ambient',
  'folk',
  'reggae',
  'punk',
  'house',
  'country',
] as const;
