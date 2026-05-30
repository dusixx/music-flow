import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth/auth-guard';
import { guestGuard } from '@core/guards/guest/guest-guard';
import { REQUIRES_AUTH } from './shared/constants/requires-auth.const';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@pages/discover/discover').then((m) => m.Discover),
  },
  {
    path: 'library',
    loadComponent: () => import('@pages/library/library').then((m) => m.Library),
    canActivate: [authGuard],
    data: { [REQUIRES_AUTH]: true },
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
    path: 'signup',
    loadComponent: () => import('@pages/signup/signup').then((m) => m.Signup),
    canActivate: [guestGuard],
  },
  {
    path: '**',
    loadComponent: () => import('@pages/not-found/not-found').then((m) => m.NotFound),
  },
];
