import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@app/core/services/auth/auth-service';
import { filter, map, take } from 'rxjs';

export const guestGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const authState = authService.authState;

  if (authState() !== 'loading') {
    return authState() === 'guest' ? true : router.createUrlTree(['/']);
  }

  return toObservable(authState).pipe(
    filter((state) => state !== 'loading'),
    take(1),
    map((state) => (state === 'guest' ? true : router.createUrlTree(['/'])))
  );
};
