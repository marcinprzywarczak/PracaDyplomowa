import { Component, Input, OnInit } from '@angular/core';
import { Offer } from '../../models/offer';
import { Photo } from '../../models/photo';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
})
export class OfferComponent implements OnInit {
  @Input() offer: Offer;
  mainPhoto: Photo;
  constructor() {}

  ngOnInit(): void {
    this.mainPhoto = this.offer.photos.find((x) => x.pivot.isMain === 1)!;
  }
}
