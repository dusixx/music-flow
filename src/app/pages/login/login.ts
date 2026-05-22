import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'player-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {}
