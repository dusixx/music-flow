import { ChangeDetectionStrategy, Component, DestroyRef, inject, model } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@app/core/services/auth/auth-service';
import { Button } from '@app/shared/components/button/button';

@Component({
  selector: 'player-mobile-menu',
  imports: [Button, RouterLink, RouterLinkActive],
  templateUrl: './mobile-menu.html',
  styleUrl: './mobile-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'open.set(false)',
  },
})
export class MobileMenu {
  protected readonly authService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  open = model(false);

  constructor() {
    const routerSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.open.set(false);
      }
    });
    this.destroyRef.onDestroy(() => routerSub.unsubscribe());
  }

  onLogoutClick() {
    this.open.set(false);
    this.authService.logout();
    void this.router.navigate(['/']);
  }
}
