import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMemberCard } from './team-member-card';

describe('TeamMemberCard', () => {
  let component: TeamMemberCard;
  let fixture: ComponentFixture<TeamMemberCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamMemberCard],
    }).compileComponents();

    fixture = TestBed.createComponent(TeamMemberCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
