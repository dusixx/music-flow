import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Carousel } from '@app/shared/components/carousel/carousel';
import { Button } from '@app/shared/directives/button/button';

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
