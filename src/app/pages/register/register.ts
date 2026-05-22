import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'player-register',
  imports: [],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register {}
