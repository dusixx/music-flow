import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksHeader } from './tracks-header';

describe('TracksHeader', () => {
  let component: TracksHeader;
  let fixture: ComponentFixture<TracksHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TracksHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(TracksHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
