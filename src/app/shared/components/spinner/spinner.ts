import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'player-spinner',
  imports: [],
  templateUrl: './spinner.html',
  styleUrl: './spinner.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Spinner {
  src = 'images/spinner.gif';
}
