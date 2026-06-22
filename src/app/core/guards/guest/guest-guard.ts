import { CanActivateFn } from '@angular/router';
import { createAuthGuard } from '../create-auth-guard';

export const guestGuard: CanActivateFn = createAuthGuard('guest');
