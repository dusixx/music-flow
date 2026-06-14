import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@app/core/services/auth/auth-service';
import { Button } from '@app/shared/components/button/button';
import { FormTextfield } from '@app/shared/components/form-textfield/form-textfield';
import { Sprite } from '@app/shared/components/sprite/sprite';
import { getErrorMessage } from '@app/shared/utils/error.utils';
import { useServerErrorResetter } from '../form/utils/server-error-resetter';
import { loginSchemaFn } from './login.schema';
import { LoginFormData, LOGIN_INITIAL_MODEL } from '../form/models/login.model';

@Component({
  selector: 'player-login',
  imports: [Button, FormTextfield, Sprite, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  protected authService = inject(AuthService);
  private readonly router = inject(Router);

  title = input('Sign In');
  submitText = input('Login');

  protected error = signal('');
  protected loading = signal(false);

  protected loginModel = signal<LoginFormData>(LOGIN_INITIAL_MODEL);
  protected loginForm = form(this.loginModel, loginSchemaFn);

  private errorResetter = useServerErrorResetter({
    formModel: this.loginModel,
    error: this.error,
  });

  private async login({ email, password }: LoginFormData) {
    this.loading.set(true);
    try {
      await this.authService.login(email, password);
      this.router.navigate(['/']);
    } catch (error) {
      this.error.set(getErrorMessage(error));
    } finally {
      this.loading.set(false);
    }
  }

  protected onSubmit(event: Event) {
    event.preventDefault();

    if (!this.loginForm().valid()) {
      this.loginForm().markAsTouched();
      return;
    }
    this.errorResetter.markAsSubmitted();
    this.login(this.loginModel());
  }
}
