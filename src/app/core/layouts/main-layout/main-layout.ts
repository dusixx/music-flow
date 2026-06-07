import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DesktopLayout } from '../desktop-layout/desktop-layout';
import { MobileLayout } from '../mobile-layout/mobile-layout';
import { AuthService } from '@app/core/services/auth/auth-service';
import { ViewportService } from '@app/core/services/viewport/viewport-service';

@Component({
  selector: 'player-main-layout',
  imports: [DesktopLayout, MobileLayout],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayout {
  viewportService = inject(ViewportService);
  authService = inject(AuthService);
}
