import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sprite } from './sprite';

describe('Sprite', () => {
  let component: Sprite;
  let fixture: ComponentFixture<Sprite>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sprite],
    }).compileComponents();

    fixture = TestBed.createComponent(Sprite);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
