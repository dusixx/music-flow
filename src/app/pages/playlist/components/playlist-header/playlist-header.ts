import { Component, input, output } from '@angular/core';
import { Playlist } from '@shared/models/firestore.model';
import { Sprite } from '@shared/components/sprite/sprite';
import { Button } from '@shared/components/button/button';
import { DurationTextPipe } from '@shared/pipes/duration-text/duration-text-pipe';
import { PlaylistMenu } from '../playlist-menu/playlist-menu';

@Component({
  selector: 'player-playlist-header',
  imports: [Sprite, Button, PlaylistMenu, DurationTextPipe],
  templateUrl: './playlist-header.html',
  styleUrl: './playlist-header.scss',
})
export class PlaylistHeader {
  playlist = input.required<Playlist>();
  displayName = input.required<string>();
  totalTime = input.required<number>();
  isPlaying = input<boolean>(false);

  playClicked = output<void>();
  editClicked = output<void>();
  deleteClicked = output<void>();
}
