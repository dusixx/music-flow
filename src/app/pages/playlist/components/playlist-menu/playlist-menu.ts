import { Component, signal, output } from '@angular/core';
import { TuiDropdown, TuiDataList } from '@taiga-ui/core';
import { TuiActiveZone, TuiObscured } from '@taiga-ui/cdk';
import { Sprite } from '@shared/components/sprite/sprite';

@Component({
  selector: 'player-playlist-menu',
  imports: [TuiDropdown, TuiDataList, TuiActiveZone, TuiObscured, Sprite],
  templateUrl: './playlist-menu.html',
  styleUrl: './playlist-menu.scss',
})
export class PlaylistMenu {
  editClicked = output<void>();
  deleteClicked = output<void>();

  protected isDropdownOpen = signal(false);

  protected onDotsClick() {
    this.isDropdownOpen.update((open) => !open);
  }

  protected onActiveZone(active: boolean) {
    if (!active) {
      this.isDropdownOpen.set(false);
    }
  }

  protected onObscured(obscured: boolean) {
    if (obscured) {
      this.isDropdownOpen.set(false);
    }
  }

  protected onActionClick(type: 'edit' | 'delete') {
    this.isDropdownOpen.set(false);
    if (type === 'edit') this.editClicked.emit();
    if (type === 'delete') this.deleteClicked.emit();
  }
}
