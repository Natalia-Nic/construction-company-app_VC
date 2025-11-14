// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';

// УБРАЛ import { authInterceptor } - используем функциональный интерцептор

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([]) // ← ПУСТОЙ МАССИВ - интерцептор пока не нужен
    )
  ]
};