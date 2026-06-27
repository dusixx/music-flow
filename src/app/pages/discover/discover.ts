import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { JAMENDO_MAIN_GENRES } from '@app/core/api/jamendo/jamendo.constants';
import { JamendoSearchParams } from '@app/core/api/jamendo/jamendo.types';
import { mockTracks } from '@app/core/api/track/mock/track.mock';
import { mapTrack } from '@app/core/api/track/track.mapper';
import { CarouselItem } from '@app/shared/components/carousel/carousel-item/carousel-item';
import { TrackCard } from '@app/shared/components/track-card/track-card';
import { CarouselSection } from './components/carousel-section/carousel-section';

const POPULAR_COUNT = 15;
const RELEASES_COUNT = 15;

// TODO: add show more button - navigate to /search?order=releases_desc[popularity_total]
// Outlined button

@Component({
  selector: 'player-discover',
  imports: [TrackCard, CarouselItem, RouterLink, CarouselSection],
  providers: [],
  templateUrl: './discover.html',
  styleUrl: './discover.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Discover {
  protected getGenreQueryParams = (genre: string): Partial<JamendoSearchParams> => ({
    fuzzytags: genre,
  });

  protected popular = { results: signal(mockTracks.slice(0, POPULAR_COUNT).map(mapTrack)) };
  protected releases = {
    results: signal(mockTracks.slice(0, RELEASES_COUNT).map(mapTrack)),
  };

  protected genresList = JAMENDO_MAIN_GENRES;

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
