import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'player-playlist',
  imports: [],
  templateUrl: './playlist.html',
  styleUrl: './playlist.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Playlist {
  protected id = input.required<string>();
}
