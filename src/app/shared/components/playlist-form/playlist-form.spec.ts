import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistForm } from './playlist-form';

describe('PlaylistForm', () => {
  let component: PlaylistForm;
  let fixture: ComponentFixture<PlaylistForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistForm],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaylistForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
