import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/services/auth/auth';
import { Button } from '@app/shared/directives/button/button';
import { TuiInput } from '@taiga-ui/core';

@Component({
  selector: 'player-header',
  imports: [Button, FormsModule, TuiInput],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  searchQuery = model('');
  protected readonly searchBarPlaceholder = 'Search for tracks...';

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
