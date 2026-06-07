import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@app/core/services/auth/auth-service';
import { SpriteIcon } from '@app/shared/components/sprite-icon/sprite-icon';

@Component({
  selector: 'player-sidebar',
  imports: [RouterLink, SpriteIcon, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {
  protected authService = inject(AuthService);
}
