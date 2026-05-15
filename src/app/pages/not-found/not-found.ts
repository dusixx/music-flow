import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomeButton } from './components/home-button/home-button';

@Component({
  selector: 'player-not-found',
  imports: [HomeButton],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFound {
  title = '404';
  message = 'The page you are looking for seems to have disappeared to the void';
}
