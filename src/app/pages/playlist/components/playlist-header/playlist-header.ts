import { Component, input, output } from '@angular/core';
import { Playlist } from '@shared/models/firestore.model';
import { Sprite } from '@shared/components/sprite/sprite';
import { Button } from '@shared/components/button/button';
import { DurationTextPipe } from '@shared/pipes/duration-text/duration-text-pipe';
import { PluralTextPipe } from '@shared/pipes/plural-text/plural-text-pipe';
import { PlaylistMenu } from '../playlist-menu/playlist-menu';

@Component({
  selector: 'player-playlist-header',
  imports: [Sprite, Button, PlaylistMenu, DurationTextPipe, PluralTextPipe],
  templateUrl: './playlist-header.html',
  styleUrl: './playlist-header.scss',
})
export class PlaylistHeader {
  playlist = input.required<Playlist>();
  displayName = input.required<string>();
  totalTime = input.required<number>();
  isPlaying = input(false);

  playClicked = output();
  editClicked = output();
  deleteClicked = output();
  protected coverLoaded = output<HTMLImageElement>();
}
