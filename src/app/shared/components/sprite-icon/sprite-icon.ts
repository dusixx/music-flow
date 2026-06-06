import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SPRITE_PATH } from '@app/shared/constants';

const resolveIconPath = (pathOrId: string) =>
  /[\\/]/.test(pathOrId) ? pathOrId : `${SPRITE_PATH}#${pathOrId}`;

@Component({
  selector: 'player-sprite-icon',
  imports: [],
  templateUrl: './sprite-icon.html',
  styleUrl: './sprite-icon.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpriteIcon {
  href = input.required({ transform: resolveIconPath });
}
