import { Component, OnInit } from '@angular/core';
import { OfferService } from '../../../../shared/services/offer/offer.service';
import { Offer } from '../../../../shared/models/offer';

@Component({
  selector: 'app-user-panel-following-offers',
  templateUrl: './user-panel-following-offers.component.html',
  styleUrls: ['./user-panel-following-offers.component.scss'],
})
export class UserPanelFollowingOffersComponent implements OnInit {
  offers: Offer[] = [];
  dataLoaded: boolean = false;
  totalRecords: number;
  currentPage: number;
  constructor(private offerService: OfferService) {}

  ngOnInit(): void {
    this.getOffers();
  }

  getOffers() {
    this.offerService
      .getFollowingOffers(this.currentPage)
      .subscribe((value) => {
        console.log(value);
        this.totalRecords = value.offers.total;
        this.offers = value.offers.data;
        this.currentPage = value.offers.current_page;
        this.dataLoaded = true;
      });
  }

  paginate(event: any) {
    if (this.currentPage !== event.page + 1) {
      this.offerService
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
