import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Track } from '@app/core/api/track/track.model';
import { Button } from '@app/shared/components/button/button';
import { StopPropagation } from '@app/shared/directives/stop-propagation/stop-propagation';
import { ComponentVariant } from '@app/shared/models/types/ui.types';

@Component({
  selector: 'player-track-cover',
  imports: [Button, StopPropagation],
  templateUrl: './track-cover.html',
  styleUrl: './track-cover.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.playing]': 'isPlaying()',
    '[class.secondary]': 'variant() === "secondary"',
    '[class.hovered]': 'isHovered()',
  },
})
export class TrackCover {
  track = input.required<Track>();
  variant = input<ComponentVariant>('primary');

  isHovered = input(false);
  isPlaying = input(false);
  isFavorite = input(false);

  playClicked = output<Track>();
  favoriteClicked = output<Track>();
}
