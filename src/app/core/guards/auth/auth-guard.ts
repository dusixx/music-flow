import { CanActivateFn } from '@angular/router';
import { createAuthGuard } from '../create-auth-guard';

export const authGuard: CanActivateFn = createAuthGuard('auth');

// import { CanActivateFn, Router } from '@angular/router';
// import { inject } from '@angular/core';
// import { AuthService } from '@app/core/services/auth/auth-service';
// import { toObservable } from '@angular/core/rxjs-interop';
// import { filter, map, take } from 'rxjs';

// export const authGuard: CanActivateFn = () => {
//   const authService = inject(AuthService);
//   const router = inject(Router);
//   const authState = authService.authState;

//   if (authState() !== 'loading') {
//     return authState() === 'auth' ? true : router.createUrlTree(['/']);
//   }

//   return toObservable(authState).pipe(
//     filter((state) => state !== 'loading'),
//     take(1),
//     map((state) => (state === 'auth' ? true : router.createUrlTree(['/'])))
//   );
// };
