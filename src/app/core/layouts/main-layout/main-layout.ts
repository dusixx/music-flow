import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'player-main-layout',
  imports: [],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayout {}
