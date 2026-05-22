import { Routes } from '@angular/router';
import { guestGuard } from '@core/guards/guest/guest-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'discover',
    pathMatch: 'full',
  },
  {
    path: 'discover',
    loadComponent: () => import('@pages/discover/discover').then((m) => m.Discover),
  },
  {
    path: 'library',
    loadComponent: () => import('@pages/library/library').then((m) => m.Library),
  },
  {
    path: 'about',
    loadComponent: () => import('@pages/about/about').then((m) => m.About),
  },
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
