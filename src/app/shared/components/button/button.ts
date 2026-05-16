import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  input,
  signal,
  viewChild,
} from '@angular/core';

type ButtonVariant = 'base' | 'primary' | 'secondary';
type ButtonSize = 'small';

@Component({
  selector: 'player-button',
  imports: [NgClass],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
  variant = input<ButtonVariant>('primary');
  label = input('');
  loading = input(false);
  disabled = input(false);
  spriteHref = input('');
  size = input<ButtonSize>();

  private buttonRef = viewChild.required<ElementRef<HTMLButtonElement>>('buttonRef');
  private width = signal<number>(0);

  protected readonly buttonClasses = computed(() => {
    return {
      btn: true,
      base: this.variant() === 'base',
      primary: this.variant() === 'primary',
      secondary: this.variant() === 'secondary',
      loading: this.loading(),
      disabled: this.disabled(),
      small: this.size() === 'small',
    };
  });

  constructor() {
    effect(() => {
      const button = this.buttonRef().nativeElement;
      const isLoading = this.loading();
      const currentLabel = this.label();

      if (currentLabel) {
        requestAnimationFrame(() => this.width.set(button.offsetWidth));
      }
      if (isLoading) {
        if (this.width()) {
          button.style.width = `${this.width()}px`;
        }
      }
    });
  }
}
