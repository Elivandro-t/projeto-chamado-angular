import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptors } from './autenticacao/services/interceptors/autenticacao.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
     {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptors,
      multi:true
    },
    provideRouter(routes,),provideHttpClient(withInterceptorsFromDi(),withFetch())
    ,provideClientHydration(), provideAnimations()
  ]
};

