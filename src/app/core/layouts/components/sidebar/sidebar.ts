import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@app/core/services/auth/auth';
import { Sprite } from '@app/shared/components/sprite/sprite';

@Component({
  selector: 'player-sidebar',
  imports: [RouterLink, Sprite, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {
  protected authService = inject(AuthService);
}
