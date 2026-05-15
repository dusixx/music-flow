import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'player-home-button',
  imports: [MatButton, RouterLink],
  templateUrl: './home-button.html',
  styleUrl: './home-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeButton {
  text = input<string>('Home');
}
