import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReloadDataTriggerService {
  followingOfferReloadTrigger = new Subject<boolean>();

  firmUsersReloadTrigger = new Subject<boolean>();

  userOffersReloadTrigger = new Subject<boolean>();
  constructor() {}

  public triggerFollowingOfferReload(): void {
    this.followingOfferReloadTrigger.next(true);
  }

  public triggerFirmUsersReload(): void {
    this.firmUsersReloadTrigger.next(true);
  }

  public triggerUserOffersReload(): void {
    this.userOffersReloadTrigger.next(true);
  }
}
