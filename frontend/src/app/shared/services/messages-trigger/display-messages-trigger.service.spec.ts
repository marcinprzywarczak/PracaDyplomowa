import { TestBed } from '@angular/core/testing';

import { DisplayMessagesTriggerService } from './messages-trigger.service';

describe('DisplayMessagesTriggerService', () => {
  let service: DisplayMessagesTriggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayMessagesTriggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
