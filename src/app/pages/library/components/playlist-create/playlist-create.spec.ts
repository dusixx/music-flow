import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistCreate } from './playlist-create';

describe('PlaylistCreate', () => {
  let component: PlaylistCreate;
  let fixture: ComponentFixture<PlaylistCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaylistCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
