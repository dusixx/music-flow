import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { JAMENDO_API_CONFIG } from './jamendo.provider';
import { JamendoApiEndpoint, JamendoResponse } from './jamendo.types';

type QueryParamValue = string | number | boolean | null | undefined;
type QueryParams = Record<string, QueryParamValue | readonly QueryParamValue[]>;

@Service()
export class JamendoService {
  private apiConfig = inject(JAMENDO_API_CONFIG);
  private httpClient = inject(HttpClient);

  private buildUrl(endpoint: JamendoApiEndpoint) {
    const { baseUrl, apiVersion } = this.apiConfig;
    return `${baseUrl}/${apiVersion}/${endpoint}`;
  }

  private normalizeQueryParams(params: QueryParams) {
    return Object.fromEntries(
      Object.entries(params)
        .map(([key, val]) =>
          Array.isArray(val) ? [key, val.filter((v) => v != null)] : [key, val]
        )
        .filter(([_, val]) => val != null)
    );
  }

  get<TRawItem>(endpoint: JamendoApiEndpoint, params: QueryParams) {
    return this.httpClient.get<JamendoResponse<TRawItem>>(this.buildUrl(endpoint), {
      params: {
        client_id: this.apiConfig.clientId,
        ...this.normalizeQueryParams(params),
      },
    });
  }
}
