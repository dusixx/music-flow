import { Directive, input } from '@angular/core';

@Directive({
  selector: '[playerCarouselItem]',
  host: {
    '[style]': '"scroll-snap-align: start;"',
    '[class]': 'playerCarouselItem()',
  },
})
export class CarouselItem {
  playerCarouselItem = input<string>();
}
