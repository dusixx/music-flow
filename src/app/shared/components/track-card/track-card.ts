import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '@app/shared/directives/button/button';
import { Track } from '@app/shared/models/track';
import { CompactNumberPipe } from '@app/shared/pipes/compact-number-pipe';
import { DurationPipe } from '@app/shared/pipes/duration-pipe';

type TrackCardVariant = 'compact';

// TODO: сделать варианты для вертикальной - горизонтальную не надо

@Component({
  selector: 'player-track-card',
  imports: [Button, RouterLink, DurationPipe, CompactNumberPipe],
  templateUrl: './track-card.html',
  styleUrl: './track-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.playing]': 'playing()',
    '[class.compact]': 'variant() === "compact"',
  },
})
export class TrackCard {
  variant = input<TrackCardVariant>();
  track = input.required<Track>();

  playing = input(false);
  favorite = input(false);

  togglePlay = output<Track>();
  toggleFavorite = output<Track>();
}
