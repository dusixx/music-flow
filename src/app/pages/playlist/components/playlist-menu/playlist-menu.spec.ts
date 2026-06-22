import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistMenu } from './playlist-menu';

describe('PlaylistMenu', () => {
  let component: PlaylistMenu;
  let fixture: ComponentFixture<PlaylistMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistMenu],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaylistMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
