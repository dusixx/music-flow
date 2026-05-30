import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '@app/core/services/auth/auth-service';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, take } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const state = authService.authState();
  if (state !== 'loading') {
    return state === 'auth' ? true : router.createUrlTree(['/']);
  }

  return toObservable(authService.authState).pipe(
    filter((state) => state !== 'loading'),
    take(1),
    map((state) => (state === 'auth' ? true : router.createUrlTree(['/'])))
  );
};
