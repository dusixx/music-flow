import { Component, computed, input, model, viewChild } from '@angular/core';
import { ComponentSize } from '@app/shared/models/types/ui.types';
import { Button } from '../button/button';
import { Carousel } from '../carousel/carousel';
import { CarouselItem } from '../carousel/carousel-item/carousel-item';

@Component({
  selector: 'player-toggle-group',
  imports: [Carousel, CarouselItem, Button],
  templateUrl: './toggle-group.html',
  styleUrl: './toggle-group.scss',
  host: {
    '[class.small]': 'size() === "small"',
    '[class.no-controls]': 'shouldHideControls()',
  },
})
export class ToggleGroup {
  protected readonly carousel = viewChild.required<Carousel>('carousel');

  size = input<ComponentSize>('small');
  checked = model<string[]>([]);

  protected checkedSet = computed(() => new Set(this.checked()));

  labels = input.required<string[] | readonly string[]>();
  protected uniqueLabels = computed(() => [...new Set(this.labels())]);

  protected shouldHideControls = computed(
    () => this.carousel().atEnd() && this.carousel().atStart()
  );
  protected onItemChange(label: string, checked: boolean) {
    if (checked) {
      this.checked.update((v) => [...v, label]);
    } else {
      this.checked.update((v) => v.filter((itm) => itm !== label));
    }
  }
}
