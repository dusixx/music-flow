import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/services/auth/auth-service';
import { Button } from '@app/shared/directives/button/button';

@Component({
  selector: 'player-login',
  imports: [Button],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  protected authService = inject(AuthService);
  private readonly router = inject(Router);

  // FIXME: remove temporary creds once the login form is integrated
  private email = 'user1@example.com';
  private password = 'Password123!';

  onClick() {
    this.router.navigateByUrl('/');
    this.authService.login(this.email, this.password);
  }
}
