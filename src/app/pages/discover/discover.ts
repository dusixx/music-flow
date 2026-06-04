import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { TrackService } from '@app/core/api/tracks/track-service';
import { Carousel } from '@app/shared/components/carousel/carousel';
import { CarouselItem } from '@app/shared/components/carousel/carousel-item/carousel-item';
import { TrackCard } from '@app/shared/components/track-card/track-card';
import { JAMENDO_GENRES } from '@app/shared/constants';
import { Button } from '@app/shared/directives/button/button';
import { Track } from '@app/shared/models/track';

type SectionData = {
  title: string;
  subtitle: string;
} & (
  | {
      id: 'popular' | 'releases';
      data: Signal<Track[]>;
    }
  | {
      id: 'genres';
      data: typeof JAMENDO_GENRES;
    }
);

@Component({
  selector: 'player-discover',
  imports: [TrackCard, Button, Carousel, CarouselItem, RouterLink],
  templateUrl: './discover.html',
  styleUrl: './discover.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Discover {
  private trackService = inject(TrackService);

  protected popular = toSignal(this.trackService.getPopular(), {
    initialValue: [],
  });
  protected releases = toSignal(this.trackService.getNewReleases(), {
    initialValue: [],
  });

  protected sectionData: SectionData[] = [
    {
      id: 'popular',
      title: 'popular',
      subtitle: 'popular subtitle',
      data: this.popular,
    },
    {
      id: 'releases',
      title: 'new releases',
      subtitle: 'releases subtitle',
      data: this.releases,
    },
    {
      id: 'genres',
      title: 'genres',
      subtitle: 'genres subtitle',
      data: JAMENDO_GENRES,
    },
  ];
}
