import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { TrackService } from '@app/core/api/tracks/track-service';
import { CarouselItem } from '@app/shared/components/carousel/carousel-item/carousel-item';
import { TrackCard } from '@app/shared/components/track-card/track-card';
import { JAMENDO_GENRES } from '@app/shared/constants';
import { CarouselSection } from './components/carousel-section/carousel-section';

@Component({
  selector: 'player-discover',
  imports: [TrackCard, CarouselItem, RouterLink, CarouselSection],
  templateUrl: './discover.html',
  styleUrl: './discover.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Discover {
  private trackService = inject(TrackService);

  protected popularTracks = toSignal(this.trackService.getPopular(), {
    initialValue: [],
  });
  protected newReleaseTracks = toSignal(this.trackService.getNewReleases(), {
    initialValue: [],
  });

  protected genresList = JAMENDO_GENRES;

  protected sectionHeading = {
    popular: {
      title: 'popular',
      subtitle: 'popular subtitle',
    },
    releases: {
      title: 'new releases',
      subtitle: 'releases subtitle',
    },
    genres: {
      title: 'genres',
      subtitle: 'genres subtitle',
    },
  };
}
