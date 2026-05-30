import { TestBed } from '@angular/core/testing';

import { RedirectService } from './redirect-service';

describe('AuthRedirect', () => {
  let service: RedirectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RedirectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
