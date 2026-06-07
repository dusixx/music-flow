import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '@app/core/services/auth/auth-service';
import { ViewportService } from '@app/core/services/viewport/viewport-service';
import { DesktopLayout } from '../desktop-layout/desktop-layout';
import { MobileLayout } from '../mobile-layout/mobile-layout';

@Component({
  selector: 'player-main-layout',
  imports: [DesktopLayout, MobileLayout],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayout {
  private readonly viewportService = inject(ViewportService);
  private readonly authService = inject(AuthService);

  protected isCheckingAuth = this.authService.isCheckingAuth;
  protected isMobile = this.viewportService.isMobile;
}
