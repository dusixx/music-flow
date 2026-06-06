/* eslint-disable @angular-eslint/component-selector */
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { SPRITE_PATH } from '@app/shared/constants';

type ButtonVariant = 'base' | 'primary' | 'secondary';
type ButtonSize = 'small' | 'medium';

const transformIconPath = (pathOrId: string) => {
  return /[\\/]/.test(pathOrId) ? pathOrId : `${SPRITE_PATH}#${pathOrId}`;
};

@Component({
  selector: 'button[playerButton]',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.btn]': 'true',
    '[class.base]': 'variant() === "base"',
    '[class.primary]': 'variant() === "primary"',
    '[class.secondary]': 'variant() === "secondary"',
    '[class.disabled]': 'disabled()',
    '[class.small]': 'size() === "small"',
    '[class.loading]': 'loading()',
    '[disabled]': 'disabled() || loading()',
    '[class.no-text]': '!hasText()',
    '[style.width.px]': 'computedWidth()',
  },
})
export class Button {
  protected spinnerPath = 'assets/images/spinner.gif';

  private host = inject<ElementRef<HTMLButtonElement>>(ElementRef);

  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('medium');
  disabled = input(false);
  loading = input(false);
  icon = input('', { transform: transformIconPath });

  protected hasText = signal(true);

  private hasUserWidth = false;
  private width = 0;

  protected computedWidth = computed(() => {
    if (this.hasUserWidth || !this.width) {
      return NaN;
    }
    return this.loading() ? this.width : null;
  });

  constructor() {
    this.readDomState();
  }

  private readDomState() {
    afterNextRender({
      read: () => {
        const button = this.host.nativeElement;

        this.hasText.set(button.textContent.trim().length !== 0);
        this.hasUserWidth = Boolean(button.style.width);
        this.width = button.offsetWidth;
      },
    });
  }
}
