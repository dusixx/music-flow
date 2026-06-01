import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackCover } from './track-cover';

describe('TrackCover', () => {
  let component: TrackCover;
  let fixture: ComponentFixture<TrackCover>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackCover],
    }).compileComponents();

    fixture = TestBed.createComponent(TrackCover);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
