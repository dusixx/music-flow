import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'player-sprite',
  imports: [],
  templateUrl: './sprite.html',
  styleUrl: './sprite.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sprite {
  href = input('');
  id = input('');
  protected spritePath = 'images/icons.svg';
}
