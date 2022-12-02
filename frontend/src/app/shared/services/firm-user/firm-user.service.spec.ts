import { TestBed } from '@angular/core/testing';

import { FirmUserService } from './firm-user.service';

describe('FirmUserService', () => {
  let service: FirmUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirmUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
