import { Injectable, inject, effect } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth-service';
import { REQUIRES_AUTH } from '@app/shared/constants/requires-auth.const';

@Injectable({
  providedIn: 'root',
})
export class RedirectService {
  private router = inject(Router);
  private authService = inject(AuthService);

  constructor() {
    this.initEffect();
  }

  private initEffect() {
    effect(() => {
      const state = this.authService.authState();
      if (state !== 'guest') {
        return;
      }

      const activeRoute = this.router.routerState.snapshot.root.firstChild;
      if (activeRoute?.data?.[REQUIRES_AUTH]) {
        this.router.navigate(['/']);
      }
    });
  }
}
