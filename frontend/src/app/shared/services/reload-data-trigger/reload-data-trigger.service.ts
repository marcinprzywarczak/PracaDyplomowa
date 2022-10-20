import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReloadDataTriggerService {
  followingOfferReloadTrigger = new Subject<boolean>();

  firmUsersReloadTrigger = new Subject<boolean>();

  userOffersReloadTrigger = new Subject<boolean>();

  userInfoReloadTrigger = new Subject<boolean>();
  userNavbarInfoReloadTrigger = new Subject<boolean>();
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

  public triggerUserInfoReload(): void {
    this.userInfoReloadTrigger.next(true);
  }

  public triggerUserNavbarInfoReload(): void {
    this.userNavbarInfoReloadTrigger.next(true);
  }
}
