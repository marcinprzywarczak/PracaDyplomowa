import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HideSidebarTriggerService {
  addFirmUserSidebarHide = new Subject<boolean>();
  constructor() {}

  public triggerAddFirmUserSidebarHide(): void {
    this.addFirmUserSidebarHide.next(true);
  }
}
