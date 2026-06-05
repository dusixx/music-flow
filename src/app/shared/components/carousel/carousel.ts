import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
} from '@angular/core';

@Component({
  selector: 'player-carousel',
  imports: [],
  templateUrl: './carousel.html',
  styleUrl: './carousel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(scroll)': 'updateScrollEdges()',
  },
})
export class Carousel {
  private host = inject<ElementRef<HTMLElement>>(ElementRef);
  private destroyRef = inject(DestroyRef);

  atStart = signal(true);
  atEnd = signal(false);

  constructor() {
    this.initScrollTracking();
  }

  private initScrollTracking() {
    afterNextRender(() => {
      this.updateScrollEdges();

      const resizeObserver = new ResizeObserver((_) => {
        this.updateScrollEdges();
      });
      resizeObserver.observe(this.host.nativeElement);

      this.destroyRef.onDestroy(() => resizeObserver.disconnect());
    });
  }

  protected updateScrollEdges() {
    const { scrollLeft, clientWidth, scrollWidth } = this.host.nativeElement;
    const left = Math.ceil(scrollLeft);

    this.atStart.set(!left);
    this.atEnd.set(left + clientWidth >= scrollWidth);
  }

  next() {
    const el = this.host.nativeElement;
    el.scrollBy({
      left: el.clientWidth,
    });
  }

  prev() {
    const el = this.host.nativeElement;
    el.scrollBy({
      left: -el.clientWidth,
    });
  }
}
