import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'player-signup-form',
  imports: [],
  templateUrl: './signup-form.html',
  styleUrl: './signup-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupForm {}
