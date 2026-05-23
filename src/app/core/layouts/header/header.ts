import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { AuthService } from '@app/core/services/auth/auth';

@Component({
  selector: 'player-header',
  imports: [RouterLink, MatIcon, MatButton, MatIconButton],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  onAuthToggle() {
    if (this.authService.isAuthenticated()) {
      this.authService.logout();
      void this.router.navigate(['/']);
      return;
    }
    this.authService.login();
  }
}
