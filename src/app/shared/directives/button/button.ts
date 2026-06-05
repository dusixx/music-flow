import {
  afterEveryRender,
  afterRenderEffect,
  Directive,
  ElementRef,
  inject,
  input,
  Renderer2,
} from '@angular/core';
import { SPRITE_PATH } from '@app/shared/constants/misc';
import { ButtonClass, SPINNER_SRC, SVG_NS } from './button.constants';

type ButtonVariant = 'base' | 'primary' | 'secondary';
type ButtonSize = 'small' | 'medium';

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
export class Button {
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('medium');
  disabled = input(false);
  loading = input(false);
  icon = input('');

  private renderer = inject(Renderer2);
  private element = inject<ElementRef<HTMLButtonElement>>(ElementRef);
  private width = 0;

  private spinner!: HTMLImageElement;
  private svg!: SVGSVGElement;
  private use!: SVGUseElement;

  constructor() {
    this.createSpinner();
    this.createSVGIcon();

    afterEveryRender(() => {
      this.toggleNoTextClass();
    });
    this.initRenderEffect();
  }

  private initRenderEffect() {
    afterRenderEffect(() => {
      const { renderer } = this;
      const isLoading = this.loading();
      const icon = this.icon();
      const button = this.element.nativeElement;

      const originWidth = button.style.width;

      if (icon) {
        const href = /[\\/]/.test(icon) ? icon : `${SPRITE_PATH}#${icon}`;

        renderer.setAttribute(this.use, 'href', href);
        renderer.removeClass(button, ButtonClass.NoIcon);
      } else {
        renderer.removeAttribute(this.use, 'href');
        renderer.addClass(button, ButtonClass.NoIcon);
      }
      if (!isLoading) {
        this.width = Number(button.getBoundingClientRect().width.toFixed(2));
        if (!originWidth) {
          button.style.width = '';
        }
      } else if (this.width && !originWidth) {
        button.style.width = `${this.width}px`;
      }
    });
  }

  private createSpinner() {
    const { renderer } = this;
    const button = this.element.nativeElement;

    this.spinner = this.renderer.createElement('img');
    renderer.addClass(this.spinner, ButtonClass.Spinner);
    renderer.setAttribute(this.spinner, 'src', SPINNER_SRC);
    renderer.setAttribute(this.spinner, 'alt', 'spinner');
    renderer.appendChild(button, this.spinner);
  }

  private createSVGIcon() {
    const { renderer } = this;
    const button = this.element.nativeElement;

    this.svg = this.renderer.createElement('svg', SVG_NS);
    renderer.addClass(this.svg, ButtonClass.Icon);

    this.use = this.renderer.createElement('use', SVG_NS);

    renderer.appendChild(this.svg, this.use);
    renderer.appendChild(button, this.svg);
  }

  private toggleNoTextClass() {
    const button = this.element.nativeElement;
    const hasText = button.textContent.trim().length !== 0;
    if (hasText) {
      this.renderer.removeClass(button, ButtonClass.NoText);
    } else {
      this.renderer.addClass(button, ButtonClass.NoText);
    }
  }
}
