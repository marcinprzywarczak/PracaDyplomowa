import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginService } from '../../shared/services/login/login.service';
import { Router } from '@angular/router';
import { OfferService } from '../../shared/services/offer/offer.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Filter } from '../../shared/models/filter';
import { Offer } from '../../shared/models/offer';
import { PropertyType } from '../../shared/models/property-type';
import { OfferType } from '../../shared/models/offer-type';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  selected: string[] = [];
  offers: Offer[];
  totalRecords: number;
  currentPage: number;
  dataLoad: boolean = false;

  form: FormGroup;
  propertyTypes: PropertyType[] = [];
  offerTypes: OfferType[] = [];
  filters: Filter[] = [];
  disabledButton: boolean;
  visibleFilterSidebar: boolean = false;

  constructor(
    private loginService: LoginService,
    private offerService: OfferService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.disabledButton = true;
    this.form = this.formBuilder.group({
      propertyType: [],
      offerType: [],
      priceFrom: [],
      priceTo: [],
      locality: [],
      areaFrom: [],
      areaTo: [],
    });
    this.onChange();
    this.getPropertyAndOfferTypes();
    this.getOffers();
  }

  onChange() {
    this.form.valueChanges.subscribe((val) => {
      this.disabledButton =
        (val.areaFrom === null || val.areaFrom === '') &&
        (val.areaTo === null || val.areaTo === '') &&
        (val.locality === null || val.locality === '') &&
        (val.offerType === null || val.offerType === '') &&
        (val.priceFrom === null || val.priceFrom === '') &&
        (val.priceTo === null || val.priceTo === '') &&
        (val.propertyType === null || val.propertyType === '');
    });
  }

  paginate(event: any) {
    if (this.currentPage !== event.page + 1) {
      this.offerService
        .getOffers(event.page + 1, this.filters)
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

  onSubmit() {
    let filters: Filter[] = [];
    this.dataLoad = false;
    this.form.setValue(this.form.value);
    if (this.form.controls['propertyType'].value !== null) {
      filters.push({
        column: 'property_type_id',
        operator: '=',
        value: this.form.controls['propertyType'].value,
      });
    }

    if (this.form.controls['offerType'].value !== null) {
      filters.push({
        column: 'offer_type_id',
        operator: '=',
        value: this.form.controls['offerType'].value,
      });
    }

    if (
      this.form.controls['priceFrom'].value !== null &&
      this.form.controls['priceFrom'].value !== ''
    ) {
      filters.push({
        column: 'price',
        operator: '>=',
        value: +this.form.controls['priceFrom'].value,
      });
    }

    if (
      this.form.controls['priceTo'].value !== null &&
      this.form.controls['priceTo'].value !== ''
    ) {
      filters.push({
        column: 'price',
        operator: '<=',
        value: +this.form.controls['priceTo'].value,
      });
    }

    if (
      this.form.controls['areaFrom'].value !== null &&
      this.form.controls['areaFrom'].value !== ''
    ) {
      filters.push({
        column: 'area_square_meters',
        operator: '>=',
        value: +this.form.controls['areaFrom'].value,
      });
    }

    if (
      this.form.controls['areaTo'].value !== null &&
      this.form.controls['areaTo'].value !== ''
    ) {
      filters.push({
        column: 'area_square_meters',
        operator: '<=',
        value: +this.form.controls['areaTo'].value,
      });
    }

    if (
      this.form.controls['locality'].value !== null &&
      this.form.controls['locality'].value !== ''
    ) {
      filters.push({
        column: 'locality',
        operator: 'like',
        value: '%' + this.form.controls['locality'].value + '%',
      });
    }

    this.filters = filters;
    this.visibleFilterSidebar = false;
    this.getOffers();
  }

  clearFilters() {
    this.dataLoad = false;
    this.filters = [];
    this.form.reset();
    this.visibleFilterSidebar = false;
    this.getOffers();
  }

  getOffers() {
    this.offerService.getOffers(1, this.filters).subscribe((value) => {
      this.totalRecords = value.offers.total;
      this.offers = value.offers.data;
      this.currentPage = value.offers.current_page;
      this.dataLoad = true;
    });
  }

  getPropertyAndOfferTypes() {
    this.offerService.getPropertyAndOfferTypes().subscribe((value) => {
      this.propertyTypes = value.propertyTypes;
      this.offerTypes = value.offerTypes;
    });
  }
}
