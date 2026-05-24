import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '@core/layouts/header/header';
import { Aside } from '../aside/aside';

@Component({
  selector: 'player-main-layout',
  imports: [RouterOutlet, Header, Aside],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayout {}
