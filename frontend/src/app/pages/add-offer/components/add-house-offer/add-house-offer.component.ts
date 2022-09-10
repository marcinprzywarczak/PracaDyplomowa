import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-house-offer',
  templateUrl: './add-house-offer.component.html',
  styleUrls: ['./add-house-offer.component.scss'],
})
export class AddHouseOfferComponent implements OnInit {
  offerType: string;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.offerType = this.route.snapshot.routeConfig?.path?.split('/')[1]!;
    console.log(this.route.snapshot.routeConfig?.path?.split('/')[1]);
  }
}
