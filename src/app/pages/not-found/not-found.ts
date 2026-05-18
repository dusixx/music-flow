import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Button } from '@app/shared/directives/button/button';

@Component({
  selector: 'player-not-found',
  imports: [Button],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFound {
  protected pageTitle = '404';
  protected buttonTitle = 'Go Home';
  protected message = 'The page you are looking for seems to have disappeared to the void';
}
