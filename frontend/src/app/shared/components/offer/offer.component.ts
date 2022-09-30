import { Component, Input, OnInit } from '@angular/core';
import { Offer } from '../../models/offer';
import { Photo } from '../../models/photo';
import { OfferService } from '../../services/offer/offer.service';
import { UserService } from '../../services/user/user.service';
import { AlertService } from '../../services/alert-service/alert.service';
import { Router } from '@angular/router';
import { ReloadDataTriggerService } from '../../services/reload-data-trigger/reload-data-trigger.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
})
export class OfferComponent implements OnInit {
  @Input() offer: Offer;
  @Input() userPanel: boolean;
  @Input() userFollowingOffers: boolean;

  mainPhoto: Photo;
  constructor(
    private offerService: OfferService,
    private userService: UserService,
    private alertService: AlertService,
    private router: Router,
    private reloadDataTriggerService: ReloadDataTriggerService
  ) {}

  ngOnInit(): void {
    console.log(this.offer);
    this.mainPhoto = this.offer.photos.find((x) => x.pivot.isMain === 1)!;
  }

  addOfferToFollowing() {
    if (!this.userService.getState()) {
      this.alertService.showError(
        'Aby obserwować ofertę musisz się zalogować!'
      );
      this.router.navigate(['/login']);
    }
    this.offerService.addOfferToFollowing(this.offer.id).subscribe({
      next: (result) => {
        this.alertService.showSuccess(result.message);
      },
      error: (err) => {
        this.alertService.showError(err.error.error);
        console.log(err);
      },
    });
  }

  removeFromFollowing() {
    if (!this.userService.getState()) {
      this.alertService.showError(
        'Aby obserwować ofertę musisz się zalogować!'
      );
      this.router.navigate(['/login']);
    }
    this.offerService.removeOfferFromFollowing(this.offer.id).subscribe({
      next: (result) => {
        this.alertService.showSuccess(result.message);
        this.reloadDataTriggerService.triggerFollowingOfferReload();
      },
      error: (err) => {
        this.alertService.showError(err.error.error);
        console.log(err);
      },
    });
  }
}
