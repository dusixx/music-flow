import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { AuthService } from '@app/core/services/auth/auth';

@Component({
  selector: 'player-header',
  imports: [MatIcon, MatButton, MatIconButton],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  onHome() {
    void this.router.navigate(['']);
  }

  goToLibrary() {
    void this.router.navigate(['/library']);
  }

  onAuthToggle() {
    if (this.authService.isAuthenticated()) {
      this.authService.logout();
      void this.router.navigate(['/discover']);
      return;
    }
    this.authService.login();
  }
}
