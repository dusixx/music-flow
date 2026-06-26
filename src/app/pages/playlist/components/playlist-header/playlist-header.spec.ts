import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistHeader } from './playlist-header';

describe('PlaylistHeader', () => {
  let component: PlaylistHeader;
  let fixture: ComponentFixture<PlaylistHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaylistHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
