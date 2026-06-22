import { JamendoPaginationParams } from '../jamendo/jamendo.types';

export interface SearchParams extends JamendoPaginationParams {
  fuzzytags?: string[];
  tags?: string[];
  durationFrom?: number;
  durationTo?: number;
  sortBy?: 'name' | 'releasedate' | 'popularity';
  sortOrder?: 'asc' | 'desc';
  query: string;
}
