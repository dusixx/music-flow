import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiRoot } from '@taiga-ui/core';
import { MainLayout } from '@core/layouts/main-layout/main-layout';

@Component({
  selector: 'player-root',
  imports: [MainLayout, TuiRoot],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
