import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/services/auth/auth-service';
import { Button } from '@app/shared/components/button/button';
import { FormTextfield } from '@app/shared/components/form-textfield/form-textfield';
import { Sprite } from '@app/shared/components/sprite/sprite';
import { getErrorMessage } from '@app/shared/utils/error.utils';
import { getServerErrorResetter } from '@app/shared/utils/form.utils';
import { TuiDropdown, TuiError, TuiInput } from '@taiga-ui/core';
import { INITIAL_MODEL, SignupFormData } from './signup.models';
import { signupFormSchemaFn } from './validators/signup-form.validator';

@Component({
  selector: 'player-signup',
  imports: [Button, TuiInput, TuiError, TuiDropdown, FormTextfield, Sprite],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Signup {
  private authService = inject(AuthService);
  private router = inject(Router);

  title = input('Sign Up');
  submitText = input('Register');

  protected error = signal('');
  protected loading = signal(false);

  protected signupModel = signal<SignupFormData>(INITIAL_MODEL);
  protected signupForm = form(this.signupModel, signupFormSchemaFn);

  private errorResetter = getServerErrorResetter({
    formModel: this.signupModel,
    error: this.error,
    clearError: () => this.error.set(''),
  });

  async register(data: SignupFormData) {
    const { email, password, name: displayName } = data;

    this.loading.set(true);
    try {
      await this.authService.register({ email, password, displayName });
      this.router.navigate(['/']);
    } catch (error) {
      this.error.set(getErrorMessage(error));
    } finally {
      this.loading.set(false);
    }
  }

  protected onSubmit(event: Event) {
    event.preventDefault();

    if (!this.signupForm().valid()) {
      this.signupForm().markAsTouched();
      return;
    }
    this.errorResetter.markAsSubmitted();
    this.register(this.signupModel());
  }
}
