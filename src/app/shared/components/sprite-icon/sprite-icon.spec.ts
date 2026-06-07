import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpriteIcon } from './sprite-icon';

describe('SpriteIcon', () => {
  let component: SpriteIcon;
  let fixture: ComponentFixture<SpriteIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpriteIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(SpriteIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
