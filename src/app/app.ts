import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'player-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
