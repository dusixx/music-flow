import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Button } from '@app/shared/directives/button/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'player-not-found',
  imports: [Button, RouterLink],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFound {
  protected readonly pageTitle = '404';
  protected readonly buttonTitle = 'Go Home';
  protected readonly message = 'The page you are looking for seems to have disappeared to the void';
}
