import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Button } from '@app/shared/components/button/button';
import { Carousel } from '@app/shared/components/carousel/carousel';

@Component({
  selector: 'player-carousel-section',
  imports: [Button, Carousel],
  templateUrl: './carousel-section.html',
  styleUrl: './carousel-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselSection {
  readonly title = input('');
  readonly subtitle = input('');
}
