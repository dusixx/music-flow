import { InjectionToken, makeEnvironmentProviders } from '@angular/core';
import { environment } from '@env/environment';

interface JamendoApiConfig {
  baseUrl: string;
  clientId: string;
  apiVersion: string;
}

export const JAMENDO_API_CONFIG = new InjectionToken<JamendoApiConfig>('JAMENDO_API_CONFIG');

export const provideJamendoApiConfig = () => {
  return makeEnvironmentProviders([
    {
      provide: JAMENDO_API_CONFIG,
      useValue: {
        baseUrl: 'https://api.jamendo.com',
        apiVersion: 'v3.0',
        clientId: environment.jamendo.clientId,
      },
    },
  ]);
};
