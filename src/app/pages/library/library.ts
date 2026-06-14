import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { PlaylistCreate } from './components/playlist-create/playlist-create';
import { Dialog } from '@app/shared/components/dialog/dialog';

@Component({
  selector: 'player-library',
  imports: [PlaylistCreate, Dialog, RouterOutlet],
  templateUrl: './library.html',
  styleUrl: './library.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Library {
  private router = inject(Router);
  protected isModalOpen = signal(false);

  // protected isChildRouteActive = computed(() => !this.router.url.includes('playlist'));
  protected isChildRouteActive = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => !event.urlAfterRedirects.includes('playlist'))
    ),
    { initialValue: !this.router.url.includes('playlist') }
  );

  protected openCreateForm() {
    this.isModalOpen.set(true);
  }

  protected closeCreateForm() {
    this.isModalOpen.set(false);
  }
}
