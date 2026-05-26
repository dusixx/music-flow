import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '@app/core/layouts/components/header/header';
import { BreakpointService } from '@app/core/services/breakpoint/breakpoint-service';
import { AngularSplitModule, SplitGutterInteractionEvent } from 'angular-split';
import { Sidebar } from '../components/sidebar/sidebar';

const SidebarParams = {
  MinWidthPx: 60,
  NormalWidthPx: 200,
  MaxWidthPx: 300,
  GutterWidthPx: 8,
  GutterDblClickDuration: 300,
};

@Component({
  selector: 'player-desktop-layout',
  imports: [RouterOutlet, Header, Sidebar, AngularSplitModule],
  templateUrl: './desktop-layout.html',
  styleUrl: './desktop-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesktopLayout {
  protected breakpointService = inject(BreakpointService);

  protected readonly gutterSize = SidebarParams.GutterWidthPx;
  protected readonly gutterDblClickDuration = SidebarParams.GutterDblClickDuration;
  protected readonly sidebarMaxSize = SidebarParams.MaxWidthPx;
  protected readonly sidebarMinSize = SidebarParams.MinWidthPx;

  protected sidebarCurrentSize = signal(SidebarParams.NormalWidthPx);

  constructor() {
    effect(() => {
      if (this.breakpointService.screenWidth() !== 'desktop') {
        this.sidebarCurrentSize.set(SidebarParams.MinWidthPx);
      }
    });
  }

  onGutterDragEnd(event: SplitGutterInteractionEvent) {
    const [size] = event.sizes;
    this.sidebarCurrentSize.set(Number(size) || SidebarParams.NormalWidthPx);
  }

  toggleSidebar() {
    this.sidebarCurrentSize.update((sz) =>
      sz === SidebarParams.MinWidthPx ? SidebarParams.NormalWidthPx : SidebarParams.MinWidthPx
    );
  }
}
