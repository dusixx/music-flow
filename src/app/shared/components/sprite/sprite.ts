import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SPRITE_PATH } from '@app/shared/constants';

const resolveIconPath = (pathOrId: string) =>
  /[\\/]/.test(pathOrId) ? pathOrId : `${SPRITE_PATH}#${pathOrId}`;

@Component({
  selector: 'player-sprite',
  imports: [],
  templateUrl: './sprite.html',
  styleUrl: './sprite.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sprite {
  icon = input.required({ transform: resolveIconPath });
}
