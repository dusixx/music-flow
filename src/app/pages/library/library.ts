import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Dialog } from '@shared/components/dialog/dialog';
import { PlaylistCreate } from './components/playlist-create/playlist-create';

@Component({
  selector: 'player-library',
  imports: [PlaylistCreate, Dialog],
  templateUrl: './library.html',
  styleUrl: './library.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Library {
  protected isModalOpen = signal(false);

  protected openCreateForm() {
    this.isModalOpen.set(true);
  }

  protected closeCreateForm() {
    this.isModalOpen.set(false);
  }
}
