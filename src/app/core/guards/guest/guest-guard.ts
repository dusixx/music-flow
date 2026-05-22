import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const guestGuard: CanActivateFn = () => {
  const router = inject(Router);

  // TODO: inject AuthService once it has been implemented
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  console.debug('isAuthenticated', isAuthenticated);

  return isAuthenticated ? router.parseUrl('/') : true;
};
