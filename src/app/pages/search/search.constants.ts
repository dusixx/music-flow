import { JAMENDO_MAX_LIMIT } from '@app/core/api/jamendo/jamendo.constants';

export const DURATION_MAX = 1800;
export const DEBOUNCE_DELAY = 500;
export const PER_PAGE_MIN = 20;
export const PER_PAGE_MAX = JAMENDO_MAX_LIMIT;
export const PER_PAGE_VALUES = [PER_PAGE_MIN, 50, 100, PER_PAGE_MAX];
