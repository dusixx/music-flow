import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { Button } from '@app/shared/components/button/button';
import { FormTextfield } from '@app/shared/components/form-textfield/form-textfield';
import { Sprite } from '@app/shared/components/sprite/sprite';
import { getServerErrorResetter } from '@app/shared/utils/form.utils';
import { TuiDropdown, TuiError, TuiInput } from '@taiga-ui/core';
import { INITIAL_MODEL, SignupFormData } from './signup-form.models';
import { signupFormSchemaFn } from './validation/signup-form.validator';

@Component({
  selector: 'player-signup-form',
  imports: [Button, TuiInput, TuiError, TuiDropdown, FormTextfield, Sprite],
  templateUrl: './signup-form.html',
  styleUrl: './signup-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupForm {
  title = input('Sign Up');
  submitText = input('Register');
  error = input<string>('');
  loading = input(false);

  submitted = output<SignupFormData>();
  clearError = output();

  protected signupModel = signal<SignupFormData>(INITIAL_MODEL);
  protected signupForm = form(this.signupModel, signupFormSchemaFn);

  private errorResetter = getServerErrorResetter({
    formModel: this.signupModel,
    error: this.error,
    clearError: () => this.clearError.emit(),
  });

  reset() {
    this.signupModel.set(INITIAL_MODEL);
    this.signupForm().reset();
  }

  protected onSubmit(event: Event) {
    event.preventDefault();

    if (!this.signupForm().valid()) {
      this.signupForm().markAsTouched();
      return;
    }
    this.errorResetter.markAsSubmitted();
    this.submitted.emit(this.signupModel());
  }
}
