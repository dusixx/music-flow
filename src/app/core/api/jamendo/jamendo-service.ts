import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { QueryParams } from '../common.types';
import { JAMENDO_API_CONFIG } from './jamendo.provider';
import { JamendoEndpoint, JamendoResponse } from './jamendo.types';
import { normalizeQueryParams } from './utils/normalize-query-params';

@Service()
export class JamendoService {
  private apiConfig = inject(JAMENDO_API_CONFIG);
  private httpClient = inject(HttpClient);

  private buildUrl(endpoint: JamendoEndpoint) {
    const { baseUrl, apiVersion } = this.apiConfig;
    return `${baseUrl}/${apiVersion}/${endpoint}`;
  }

  get<TRawItem>(endpoint: JamendoEndpoint, params: QueryParams) {
    return this.httpClient.get<JamendoResponse<TRawItem>>(this.buildUrl(endpoint), {
      params: {
        client_id: this.apiConfig.clientId,
        ...normalizeQueryParams(params),
      },
    });
  }
}
