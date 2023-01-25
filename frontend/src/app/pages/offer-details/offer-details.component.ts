import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { OfferService } from '../../shared/services/offer/offer.service';
import { finalize, switchMap } from 'rxjs';
import { UserService } from '../../shared/services/user/user.service';
import { RouteService } from '../../shared/services/route/route.service';
import { Offer } from '../../shared/models/offer';
import { Photo } from '../../shared/models/photo';
import { User } from '../../shared/models/user';
import { Firm } from '../../shared/models/firm';
import { MessageService } from '../../shared/services/message/message.service';
import { AlertService } from '../../shared/services/alert-service/alert.service';
import { NewMessage } from '../../shared/models/new-message';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss'],
})
export class OfferDetailsComponent implements OnInit {
  photos: Photo[];

  dataLoaded: boolean = false;
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 8,
    },
    {
      breakpoint: '768px',
      numVisible: 5,
    },
    {
      breakpoint: '560px',
      numVisible: 5,
    },
  ];

  offerDetails: Offer;
  owner: User;
  firm: Firm;
  isLogged: boolean;
  parameters: any = [];
  parameterCategories: any;
  message: string;
  messageSubject: string;
  messageSendLoading: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: OfferService,
    private userService: UserService,
    private messageService: MessageService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.isLogged = this.userService.getState();
    const id: number = +this.route.snapshot.paramMap.get('id')!;
    this.apiService
      .getOffer(id)
      .pipe(
        finalize(() => {
          this.dataLoaded = true;
          this.setValue();
          this.getParameters();
        })
      )
      .subscribe((value) => {
        this.offerDetails = value.offer;
        this.photos = value.offer.photos;
        if (this.photos.length === 0) {
          this.photos = [
            {
              path: '/assets/default_photo.png',
              photo_url: '/assets/default_photo.png',
              description: 'zdj',
              id: 0,
              pivot: { offer_id: id, isMain: 1, photo_id: 0 },
              created_at: '',
              updated_at: '',
            },
          ];
        }
        this.parameterCategories = value.parameterCategories;
      });
  }
  setValue() {
    this.owner = this.offerDetails.user;
    this.firm = this.owner.firm;
  }

  getParameters() {
    this.parameterCategories.forEach((parameterCategory: any) => {
      let params: any = [];

      this.offerDetails.parameters
        .filter((x) => x.parameter_category_id === parameterCategory.id)
        .forEach((x) => {
          if (x.pivot.value === '') {
            params.push(x.name);
          } else {
            this.parameters.push({
              name: x.name,
              value: x.pivot.value,
            });
          }
        });
      if (params.length !== 0) {
        this.getStringOfArray(params);
        this.parameters.push({
          name: parameterCategory.name,
          value: params,
        });
      }
    });
  }

  getStringOfArray(values: any[]) {
    let val = '';
    values.forEach((x) => {
      val += x + ', ';
    });
  }

  isArray(val: any): boolean {
    return typeof val === 'object';
  }

  sendMessage() {
    this.messageSendLoading = true;
    const message: NewMessage = {
      user_message_to: this.owner.id,
      offer_id: this.offerDetails.id,
      subject: this.messageSubject,
      message: this.message,
    };
    this.messageService.sendMessage(message).subscribe({
      next: (value) => {
        this.message = '';
        this.messageSubject = '';
        this.messageSendLoading = false;
        this.alertService.showSuccess('Wiadomość pomyślnie wysłana!');
      },
      error: (err) => {
        this.messageSendLoading = false;
        this.alertService.showError('Błąd podczas wysyłania wiadomości.');
      },
    });
  }
}
