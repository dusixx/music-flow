import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { mapTrack } from '@app/core/api/track/track.mapper';
import { mockTracks } from '@app/core/api/track/mock/track.mock';
import { Button } from '@app/shared/components/button/button';
import { CarouselItem } from '@app/shared/components/carousel/carousel-item/carousel-item';
import { TrackCard } from '@app/shared/components/track-card/track-card';
import { JAMENDO_GENRES } from '@app/shared/constants';
import { CarouselSection } from './components/carousel-section/carousel-section';
import { PopularStore } from './store/popular-store';
import { ReleasesStore } from './store/realeases-store';

const POPULAR_COUNT = 15;
const RELEASES_COUNT = 15;

@Component({
  selector: 'player-discover',
  imports: [TrackCard, CarouselItem, RouterLink, CarouselSection, Button],
  providers: [PopularStore, ReleasesStore],
  templateUrl: './discover.html',
  styleUrl: './discover.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Discover {
  // protected popular = inject(PopularStore);
  // protected releases = inject(ReleasesStore);

  protected popular = { results: signal(mockTracks.slice(0, POPULAR_COUNT).map(mapTrack)) };
  protected releases = {
    results: signal(mockTracks.slice(0, RELEASES_COUNT).map(mapTrack)),
  };

  // constructor() {
  //   this.popular.load({ limit: POPULAR_COUNT });
  //   this.releases.load({ limit: RELEASES_COUNT });
  // }

  protected genresList = JAMENDO_GENRES;

  protected tracksData = [
    {
      title: 'popular',
      subtitle: 'popular subtitle',
      tracks: this.popular.results,
    },
    {
      title: 'new releases',
      subtitle: 'releases subtitle',
      tracks: this.releases.results,
    },
  ];
}
