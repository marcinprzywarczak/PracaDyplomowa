import { TestBed } from '@angular/core/testing';

import { ReloadDataTriggerService } from './reload-data-trigger.service';

describe('ReloadDataTriggerService', () => {
  let service: ReloadDataTriggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReloadDataTriggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
