import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'player-library',
  imports: [],
  templateUrl: './library.html',
  styleUrl: './library.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Library {}
