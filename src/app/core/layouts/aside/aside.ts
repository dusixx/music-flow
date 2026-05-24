import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@app/core/services/auth/auth';
import { Sprite } from '@app/shared/components/sprite/sprite';

@Component({
  selector: 'player-aside',
  imports: [RouterLink, Sprite, RouterLinkActive],
  templateUrl: './aside.html',
  styleUrl: './aside.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Aside {
  authService = inject(AuthService);
}
