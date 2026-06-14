import { afterNextRender, DestroyRef, Directive, ElementRef, inject, input } from '@angular/core';

const MODE_ATTR_NAME = 'data-mode';

@Directive({
  selector: '[playerTuiInvalidModeOverride]',
  host: {
    '[attr.data-mode]': 'invalid() ? "invalid" : null',
  },
})
export class TaigaInvalidModeOverride {
  private destroyRef = inject(DestroyRef);
  private host = inject<ElementRef<HTMLElement>>(ElementRef);

  invalid = input(false);

  constructor() {
    this.syncInvalidAttributeWithDom();
  }

  private syncInvalidAttributeWithDom() {
    afterNextRender(() => {
      const observer = new MutationObserver((mutations) => {
        for (const m of mutations) {
          if (m.attributeName === MODE_ATTR_NAME && !this.invalid()) {
            this.host.nativeElement.removeAttribute(MODE_ATTR_NAME);
          }
        }
      });
      observer.observe(this.host.nativeElement, {
        attributes: true,
        attributeFilter: [MODE_ATTR_NAME],
      });
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
