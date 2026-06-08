import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../components/header/header';
import { MobileMenu } from '../components/mobile-menu/mobile-menu';

@Component({
  selector: 'player-mobile-layout',
  imports: [Header, RouterOutlet, MobileMenu],
  templateUrl: './mobile-layout.html',
  styleUrl: './mobile-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileLayout {
  protected menuOpen = model(false);
}
