import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FavTrack } from '../../about.models';

@Component({
  selector: 'player-team-member-card',
  imports: [],
  templateUrl: './team-member-card.html',
  styleUrl: './team-member-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamMemberCard {
  name = input.required<string>();
  role = input.required<string>();
  bio = input.required<string>();
  photo = input.required<string>();
  github = input.required<string>();
  favtracks = input.required<FavTrack[]>();
}
