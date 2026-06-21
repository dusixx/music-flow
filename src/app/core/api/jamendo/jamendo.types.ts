export type JamendoEndpoint = 'tracks' | 'artists' | 'albums';

export interface JamendoResponse<T> {
  headers: {
    status: 'success' | 'failed';
    code: number;
    error_message: string;
    warnings: string;
    results_count: number;
    next?: string;
  };
  results: T[];
}

export interface JamendoResult<T> {
  hasMore: boolean;
  results: T[];
}

export interface JamendoPaginationParams {
  limit?: number;
  offset?: number;
}

export interface JamendoSearchParams extends JamendoPaginationParams {
  search: string;
  fuzzytags?: string;
  tags?: string;
  durationbetween?: string;
  order?: string;
  boost?: string;
}
