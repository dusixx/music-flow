import {
  AfterViewChecked,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core';

type ButtonVariant = 'base' | 'primary' | 'secondary';
type ButtonSize = 'small';

const CLASS_NO_TEXT = 'no-text';

@Directive({
  selector: 'button[playerButton]',
  host: {
    '[class.btn]': 'true',
    '[class.base]': 'variant() === "base"',
    '[class.primary]': 'variant() === "primary"',
    '[class.secondary]': 'variant() === "secondary"',
    '[class.disabled]': 'disabled()',
    '[class.small]': 'size() === "small"',
    '[class.loading]': 'loading()',
    '[disabled]': 'disabled() || loading()',
  },
})
export class Button implements AfterViewChecked {
  variant = input<ButtonVariant>('primary');
  disabled = input(false);
  loading = input(false);
  size = input<ButtonSize>();

  private element = inject<ElementRef<HTMLButtonElement>>(ElementRef);
  private width = signal<number>(0);

  ngAfterViewChecked() {
    const button = this.element.nativeElement;
    const hasText = button.innerText.trim().length > 0;
    button.classList.toggle(CLASS_NO_TEXT, !hasText);
  }

  constructor() {
    effect(() => {
      const isLoading = this.loading();
      const button = this.element.nativeElement;
      const currentWidth = this.width();

      if (!isLoading) {
        requestAnimationFrame(() => {
          const offsetWidth = Number(button.getBoundingClientRect().width.toFixed(2));
          this.width.set(offsetWidth);
        });
        button.style.width = '';
      } else if (currentWidth) {
        button.style.width = `${currentWidth}px`;
      }
    });
  }
}
