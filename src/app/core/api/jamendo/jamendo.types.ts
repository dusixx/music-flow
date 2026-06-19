export type JamendoApiEndpoint = 'tracks' | 'artists' | 'albums';

export interface JamendoResponse<T> {
  headers: {
    status: 'success' | 'failed';
    code: number;
    error_message: string;
    warnings: string;
    results_count: number;
    next: string | null;
  };
  results: T[];
}

export interface JamendoResult<T> {
  hasMore: boolean;
  results: T[];
}
