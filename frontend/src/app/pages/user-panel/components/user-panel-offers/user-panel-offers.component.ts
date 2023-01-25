import { Component, OnDestroy, OnInit } from '@angular/core';
import { Offer } from '../../../../shared/models/offer';
import { OfferStatus } from '../../../../shared/models/offer-status';
import { ReloadDataTriggerService } from '../../../../shared/services/reload-data-trigger/reload-data-trigger.service';
import { Subscription } from 'rxjs';
import { OfferManagementService } from '../../../../shared/services/offer-management/offer-management.service';

@Component({
  selector: 'app-user-panel-offers',
  templateUrl: './user-panel-offers.component.html',
  styleUrls: ['./user-panel-offers.component.scss'],
})
export class UserPanelOffersComponent implements OnInit, OnDestroy {
  offers: Offer[] = [];
  offerStatusOptions: string[] = ['aktywne', 'zakończone'];
  offerStatus: string = 'aktywne';
  dataLoaded: boolean = false;
  totalRecords: number;
  currentPage: number;
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

  listenOnTrigger() {
    this.triggerSubscription =
      this.reloadDataTriggerService.userOffersReloadTrigger.subscribe(() => {
        this.dataLoaded = false;
        this.getOffers();
      });
  }

  offerStatusChang(event: any) {
    this.dataLoaded = false;
    this.getOffers();
  }

  getOffers() {
    this.offerManagementService
      .getUserOffer(this.currentPage, this.offerStatus)
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
        .getUserOffer(event.page + 1, this.offerStatus)
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
