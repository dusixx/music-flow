/* eslint-disable @angular-eslint/component-selector */
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Sprite } from '../sprite/sprite';

type ButtonVariant = 'base' | 'primary' | 'secondary';
type ButtonSize = 'small' | 'medium';

@Component({
  selector: 'button[playerButton]',
  imports: [Sprite],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.btn]': 'true',
    '[class.base]': 'variant() === "base"',
    '[class.primary]': 'variant() === "primary"',
    '[class.secondary]': 'variant() === "secondary"',
    '[class.small]': 'size() === "small"',
    '[class.loading]': 'loading()',
    '[disabled]': 'disabled() || loading()',
  },
})
export class Button {
  protected spinnerPath = 'assets/images/spinner.gif';

  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('medium');
  disabled = input(false);
  loading = input(false);
  icon = input('');
}
