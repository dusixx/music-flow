import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TEAM_MEMBERS } from './about.data';
import { TeamMemberCard } from './components/team-member-card/team-member-card';

@Component({
  selector: 'player-about',
  imports: [TeamMemberCard],
  templateUrl: './about.html',
  styleUrl: './about.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  protected readonly teamMembers = TEAM_MEMBERS;
}
