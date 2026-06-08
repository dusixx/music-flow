import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ViewportService } from '@app/core/services/viewport/viewport-service';
import { Track } from '@app/shared/models/track';
import { CompactNumberPipe } from '@app/shared/pipes/compact-number-pipe';
import { DurationPipe } from '@app/shared/pipes/duration-pipe';
import { TrackCover } from '../track-cover/track-cover';

@Component({
  selector: 'player-track-card',
  imports: [RouterLink, DurationPipe, CompactNumberPipe, TrackCover],
  templateUrl: './track-card.html',
  styleUrl: './track-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.playing]': 'isPlaying()',
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'isHovered.set(false)',
  },
})
export class TrackCard {
  private readonly viewportService = inject(ViewportService);

  track = input.required<Track>();

  isHovered = signal(false);
  isPlaying = input(false);
  isFavorite = input(false);

  playClicked = output<Track>();
  favoriteClicked = output<Track>();

  protected onMouseEnter(): void {
    if (this.viewportService.canHover()) {
      this.isHovered.set(true);
    }
  }
}
