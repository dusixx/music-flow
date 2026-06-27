export type QueryParamValue = string | number | boolean | null | undefined;
export type QueryParams = Record<string, QueryParamValue>;

export type SearchQuery = PartialNullable<{ q: string }>;

export interface EntityWithId {
  id: string;
}
export type PartialNullable<T> = {
  [K in keyof T]?: T[K] | null;
};
export type PartialNullableExcept<T, K extends keyof T> = PartialNullable<T> & {
  [P in K]-?: NonNullable<T[P]>;
};
