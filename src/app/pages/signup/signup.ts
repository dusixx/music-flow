import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/services/auth/auth-service';
import { getErrorMessage } from '@app/shared/utils/error.utils';
import { SignupForm } from './components/signup-form/signup-form';
import { SignupFormData } from './components/signup-form/signup-form.models';

@Component({
  selector: 'player-signup',
  imports: [SignupForm],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Signup {
  private authService = inject(AuthService);
  private router = inject(Router);

  protected error = signal('');
  protected loading = signal(false);

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
}
