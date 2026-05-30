import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BreakpointService } from '@app/core/services/breakpoint/breakpoint-service';
import { DesktopLayout } from '../desktop-layout/desktop-layout';
import { MobileLayout } from '../mobile-layout/mobile-layout';
import { AuthService } from '@app/core/services/auth/auth-service';

@Component({
  selector: 'player-main-layout',
  imports: [DesktopLayout, MobileLayout],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayout {
  protected breakpointService = inject(BreakpointService);
  protected authService = inject(AuthService);
}
