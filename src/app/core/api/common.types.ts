export type QueryParamValue = string | number | boolean | null | undefined;
export type QueryParams = Record<string, QueryParamValue>;
export interface EntityWithId {
  id: string;
}
