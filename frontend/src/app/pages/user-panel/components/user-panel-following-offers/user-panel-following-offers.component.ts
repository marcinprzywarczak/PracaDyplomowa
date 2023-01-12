import { Component, OnDestroy, OnInit } from '@angular/core';
import { Offer } from '../../../../shared/models/offer';
import { ReloadDataTriggerService } from '../../../../shared/services/reload-data-trigger/reload-data-trigger.service';
import { Subscription } from 'rxjs';
import { OfferManagementService } from '../../../../shared/services/offer-management/offer-management.service';

@Component({
  selector: 'app-user-panel-following-offers',
  templateUrl: './user-panel-following-offers.component.html',
  styleUrls: ['./user-panel-following-offers.component.scss'],
})
export class UserPanelFollowingOffersComponent implements OnInit, OnDestroy {
  offers: Offer[] = [];
  dataLoaded: boolean = false;
  totalRecords: number;
  currentPage: number = 0;
  triggerSubscription: Subscription;
  constructor(
    private offerManagementService: OfferManagementService,
    private reloadDataTriggerService: ReloadDataTriggerService
  ) {}

  ngOnInit(): void {
    this.getOffers();
    this.listenOnTrigger();
  }

  ngOnDestroy() {
    this.triggerSubscription.unsubscribe();
  }

  private listenOnTrigger(): void {
    this.triggerSubscription =
      this.reloadDataTriggerService.followingOfferReloadTrigger.subscribe(
        () => {
          this.dataLoaded = false;
          this.getOffers();
        }
      );
  }
  getOffers() {
    this.offerManagementService
      .getFollowingOffers(this.currentPage)
      .subscribe((value) => {
        this.totalRecords = value.offers.total;
        this.offers = value.offers.data;
        this.currentPage = value.offers.current_page;
        this.dataLoaded = true;
      });
  }

  paginate(event: any) {
    if (this.currentPage !== event.page + 1) {
      this.offerManagementService
        .getFollowingOffers(event.page + 1)
        .subscribe((value) => {
          this.offers = value.offers.data;
        });
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
      this.currentPage = event.page + 1;
    }
  }
}
