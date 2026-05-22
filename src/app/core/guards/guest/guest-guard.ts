import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const guestGuard: CanActivateFn = () => {
  // TODO: inject AuthService once it has been implemented
  const isAuth = Number(Math.random().toFixed(1)) >= 0.5;
  const router = inject(Router);

  console.debug('isAuth', isAuth);

  return isAuth ? router.parseUrl('/') : true;
};
