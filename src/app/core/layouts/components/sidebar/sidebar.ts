import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@app/core/services/auth/auth-service';
import { Sprite } from '@app/shared/components/sprite/sprite';

@Component({
  selector: 'player-sidebar',
  imports: [RouterLink, Sprite, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {
  private authService = inject(AuthService);

  protected readonly isAuthenticated = this.authService.isAuthenticated;
}
