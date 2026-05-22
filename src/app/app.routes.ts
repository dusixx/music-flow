import { Routes } from '@angular/router';
import { guestGuard } from '@core/guards/guest/guest-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('@pages/login/login').then((m) => m.Login),
    canActivate: [guestGuard],
  },
  {
    path: 'register',
    loadComponent: () => import('@pages/register/register').then((m) => m.Register),
    canActivate: [guestGuard],
  },
  {
    path: '**',
    loadComponent: () => import('@pages/not-found/not-found').then((m) => m.NotFound),
  },
];
