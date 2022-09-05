import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ApiService } from '../../shared/services/api/api.service';
import { finalize, switchMap } from 'rxjs';
import { UserService } from '../../shared/services/user/user.service';
import { RouteService } from '../../shared/services/route/route.service';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss'],
})
export class OfferDetailsComponent implements OnInit {
  photos: any[];

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

  offerDetails: any;
  owner: any;
  firm: any;
  isLogged: boolean;
  parameters: any = [];
  parameterCategories: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private userService: UserService
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
      .subscribe((value: any) => {
        this.offerDetails = value.offer;
        this.photos = value.offer.photos;
        console.log(this.photos);
        if (this.photos.length === 0) {
          this.photos = [
            { path: '/assets/default-photo.jpg', description: 'zdj' },
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
        .filter((x: any) => x.parameter_category_id === parameterCategory.id)
        .forEach((x: any) => {
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
    // this.offerDetails.parameters.forEach((parameter: any) => {
    //   if (parameter.pivot.value === '') {
    //     let params: any[] = [];
    //     this.offerDetails.parameters
    //       .filter(
    //         (x: any) =>
    //           x.parameter_category_id === parameter.parameter_category_id
    //       )
    //       .forEach((x: any) => {
    //         console.log(x);
    //         params.push(x.name);
    //       });
    //     console.log(
    //       this.parameterCategories.find(
    //         (x: any) => x.id === parameter.parameter_category_id
    //       ).name
    //     );
    //     this.parameters.push({
    //       name: this.parameterCategories.find(
    //         (x: any) => x.id === parameter.parameter_category_id
    //       ).name,
    //       value: params,
    //     });
    //     console.log(params);
    //   }
    // });
    console.log('test');
    console.log(this.parameters);
  }

  getStringOfArray(values: any[]) {
    let val = '';
    values.forEach((x) => {
      val += x + ', ';
    });
    console.log(val);
  }

  isArray(val: any): boolean {
    return typeof val === 'object';
  }
}
