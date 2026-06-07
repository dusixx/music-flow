import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  model,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@app/core/services/auth/auth-service';
import { ViewportService } from '@app/core/services/viewport/viewport-service';
import { Button } from '@app/shared/components/button/button';
import { TuiInput } from '@taiga-ui/core';

@Component({
  selector: 'player-header',
  imports: [Button, FormsModule, TuiInput, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  protected readonly authService = inject(AuthService);
  protected readonly viewportService = inject(ViewportService);

  private menuButton = viewChild.required<ElementRef<HTMLButtonElement>>('menuButton');
  protected searchQuery = '';
  menuOpen = model(false);

  openMenu() {
    this.menuOpen.set(true);
    this.menuButton().nativeElement.blur();
  }
}
