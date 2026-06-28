import { Component, computed, input } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { TaigaInvalidModeOverride } from '@app/shared/directives/taiga-overrides/invalid-mode-override';
import { TuiButtonX, TuiDropdown, TuiIcon, TuiInput } from '@taiga-ui/core';
import { TuiPassword } from '@taiga-ui/kit';
import { Sprite } from '../sprite/sprite';

@Component({
  selector: 'player-form-textfield',
  imports: [
    FormField,
    TuiInput,
    TuiIcon,
    TuiPassword,
    TuiButtonX,
    TaigaInvalidModeOverride,
    TuiDropdown,
    Sprite,
  ],
  templateUrl: './form-textfield.html',
  styleUrl: './form-textfield.scss',
})
export class FormTextfield {
  formField = input.required<FieldTree<string>>();
  invalid = input(false);
  showErrorIcon = input(false);
  type = input('text');
  placeholder = input('');
  autocomplete = input<'on' | 'off'>('off');

  protected passwordInput = computed(() => this.type() === 'password');
}
