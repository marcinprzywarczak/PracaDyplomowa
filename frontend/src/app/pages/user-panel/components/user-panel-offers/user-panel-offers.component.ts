import { Component, OnInit } from '@angular/core';
import { OfferService } from '../../../../shared/services/offer/offer.service';
import { Offer } from '../../../../shared/models/offer';
import { OfferStatus } from '../../../../shared/models/offer-status';

@Component({
  selector: 'app-user-panel-offers',
  templateUrl: './user-panel-offers.component.html',
  styleUrls: ['./user-panel-offers.component.scss'],
})
export class UserPanelOffersComponent implements OnInit {
  offers: Offer[] = [];
  offerStatuses: OfferStatus[] = [];
  offerStatusOptions: string[] = ['aktywne', 'zakończone'];
  offerStatus: string = 'aktywne';
  dataLoaded: boolean = false;
  // offerStatusModel: string = 'aktywne';
  totalRecords: number;
  currentPage: number;
  constructor(private offerService: OfferService) {}

  ngOnInit(): void {
    this.getOffers();
  }

  offerStatusChang(event: any) {
    this.dataLoaded = false;
    this.getOffers();
  }

  getOffers() {
    this.offerService
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
      this.offerService
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