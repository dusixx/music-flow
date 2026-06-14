import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'player-playlist',
  imports: [],
  templateUrl: './playlist.html',
  styleUrl: './playlist.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Playlist {
  private activatedRoute = inject(ActivatedRoute);

  protected readonly id = computed(() => this.activatedRoute.snapshot.paramMap.get('id') ?? '');
}
