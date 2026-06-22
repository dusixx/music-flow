import {
  ChangeDetectionStrategy,
  Component,
  computed,
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
import { SearchService } from '../../../services/search/search-service';

@Component({
  selector: 'player-header',
  imports: [Button, FormsModule, TuiInput, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  protected readonly searchService = inject(SearchService);
  protected readonly authService = inject(AuthService);
  protected readonly viewportService = inject(ViewportService);

  private menuButton = viewChild.required<ElementRef<HTMLButtonElement>>('menuButton');

  menuOpen = model(false);

  // TODO: fix user update logic in the auth service

  protected userNameInitial = computed(() => {
    const user = this.authService.user();
    if (!user) {
      return '';
    }
    const name = user.displayName || user.email;
    return name ? name[0].toLocaleUpperCase() : '';
  });

  logout() {
    this.authService.logout();
  }

  openMenu() {
    this.menuOpen.set(true);
    this.menuButton().nativeElement.blur();
  }
}
