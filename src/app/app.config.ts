import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideJamendoApiConfig } from '@core/api/jamendo/jamendo.provider';
import { provideTaiga } from '@taiga-ui/core';
import { routes } from './app.routes';
import { errorInterceptor } from './core/interceptors/error-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideTaiga(),
    provideJamendoApiConfig(),
    provideHttpClient(withInterceptors([errorInterceptor])),
  ],
};
