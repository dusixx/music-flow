import { Component, inject } from '@angular/core';
import { SearchStore } from '@app/pages/search/store/search-store';
import { TrackCard } from '@shared/components/track-card/track-card';
import { Button } from '@app/shared/components/button/button';

@Component({
  selector: 'player-search',
  imports: [TrackCard, Button],
  providers: [SearchStore],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {
  protected searchStore = inject(SearchStore);
}
