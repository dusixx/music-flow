import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TeamMember } from '../../about.models';

@Component({
  selector: 'player-team-member-card',
  templateUrl: './team-member-card.html',
  styleUrl: './team-member-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamMemberCard {
  member = input.required<TeamMember>();
}
