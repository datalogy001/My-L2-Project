import { TestBed } from '@angular/core/testing';

import { FacebookLoginService } from './facebook-login.service';

describe('FacebookLoginService', () => {
  let service: FacebookLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacebookLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
