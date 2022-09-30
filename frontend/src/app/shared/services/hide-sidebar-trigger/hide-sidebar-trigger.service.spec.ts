import { TestBed } from '@angular/core/testing';

import { HideSidebarTriggerService } from './hide-sidebar-trigger.service';

describe('HideSidebarTriggerService', () => {
  let service: HideSidebarTriggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HideSidebarTriggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
