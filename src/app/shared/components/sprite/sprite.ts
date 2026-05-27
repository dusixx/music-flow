import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SPRITE_PATH } from '@app/core/constants';

@Component({
  selector: 'player-sprite',
  imports: [],
  templateUrl: './sprite.html',
  styleUrl: './sprite.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.--sprite-icon-size]': 'size()',
    '[style.--sprite-icon-color]': 'color()',
  },
})
export class Sprite {
  iconUrl = input('');
  iconId = input('');
  size = input('14px');
  color = input('currentColor');
  protected readonly spritePath = SPRITE_PATH;
}
