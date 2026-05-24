import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '@core/layouts/header/header';
import { AngularSplitModule, SplitGutterInteractionEvent } from 'angular-split';
import { Aside } from '../aside/aside';

const SIDEBAR_MIN_WIDTH_PX = 60;
const SIDEBAR_NORMAL_WIDTH_PX = 250;
const SIDEBAR_MAX_WIDTH_PX = 350;

@Component({
  selector: 'player-main-layout',
  imports: [RouterOutlet, Header, Aside, AngularSplitModule],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayout {
  protected readonly gutterSize = 8;
  protected readonly sidebarMaxSize = SIDEBAR_MAX_WIDTH_PX;

  protected sidebarCurrentSize = signal(SIDEBAR_NORMAL_WIDTH_PX);
  protected sidebarMinSize = signal(SIDEBAR_MIN_WIDTH_PX);

  onGutterDragEnd(event: SplitGutterInteractionEvent) {
    const [size] = event.sizes;
    this.sidebarCurrentSize.set(Number(size) || SIDEBAR_NORMAL_WIDTH_PX);
  }

  toggleSidebar() {
    this.sidebarCurrentSize.update((sz) =>
      sz === SIDEBAR_MIN_WIDTH_PX ? SIDEBAR_NORMAL_WIDTH_PX : SIDEBAR_MIN_WIDTH_PX
    );
  }
}
