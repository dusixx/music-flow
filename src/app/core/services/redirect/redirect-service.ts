import { Injectable, inject, effect } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
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
      const routeRoot = this.router.routerState.snapshot.root;
      if (this.hasRouteData(routeRoot, REQUIRES_AUTH)) {
        this.router.navigate(['/']);
      }
    });
  }

  private hasRouteData(route: ActivatedRouteSnapshot, key: string) {
    if (route.data && route.data[key]) {
      return true;
    }
    for (const child of route.children) {
      if (this.hasRouteData(child, key)) {
        return true;
      }
    }
    return false;
  }
}
