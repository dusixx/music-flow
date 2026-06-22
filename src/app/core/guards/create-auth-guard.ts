import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, take } from 'rxjs';
import { AuthService } from '@core/services/auth/auth-service';
import { AuthState } from '@shared/models/auth.model';

export function createAuthGuard(targetState: Exclude<AuthState, 'loading'>) {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const authState = authService.authState;

    const redirectUrlTree = router.createUrlTree(['/']);

    if (authState() !== 'loading') {
      return authState() === targetState || redirectUrlTree;
    }

    return toObservable(authState).pipe(
      filter((state) => state !== 'loading'),
      take(1),
      map((state) => state === targetState || redirectUrlTree)
    );
  };
}
