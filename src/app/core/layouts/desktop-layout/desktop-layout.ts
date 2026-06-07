import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '@app/core/layouts/components/header/header';
import { ViewportService } from '@app/core/services/viewport/viewport-service';
import { AngularSplitModule, SplitGutterInteractionEvent } from 'angular-split';
import { Sidebar } from '../components/sidebar/sidebar';

const SidebarParams = {
  MinWidthPx: 64,
  NormalWidthPx: 200,
  MaxWidthPx: 500,
  GutterWidthPx: 4,
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
  private readonly viewportService = inject(ViewportService);

  protected readonly gutterSize = SidebarParams.GutterWidthPx;
  protected readonly gutterDblClickDuration = SidebarParams.GutterDblClickDuration;
  protected readonly sidebarMaxSize = SidebarParams.MaxWidthPx;
  protected readonly sidebarMinSize = SidebarParams.MinWidthPx;

  protected sidebarCurrentSize = signal(SidebarParams.NormalWidthPx);

  constructor() {
    effect(() => {
      if (!this.viewportService.isDesktop()) {
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
