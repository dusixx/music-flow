import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from '@core/layouts/footer/footer';
import { Header } from '@core/layouts/header/header';

@Component({
  selector: 'player-main-layout',
  imports: [RouterOutlet, Footer, Header],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayout {}
