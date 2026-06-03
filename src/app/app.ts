import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TuiRoot } from '@taiga-ui/core';
import { MainLayout } from '@core/layouts/main-layout/main-layout';
import { RedirectService } from '@core/services/redirect/redirect-service';

@Component({
  selector: 'player-root',
  imports: [MainLayout, TuiRoot],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private _ = inject(RedirectService);
}
