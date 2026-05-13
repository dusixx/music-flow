import { ChangeDetectionStrategy, Component, inject, input, InputSignal } from '@angular/core';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'player-header',
  imports: [MatIcon, MatButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private readonly router: Router = inject(Router);
  readonly isAuthorized: InputSignal<boolean> = input.required<boolean>();

  onHome(): void {
    void this.router.navigate(['']);
  }
}
