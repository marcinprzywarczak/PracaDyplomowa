import { Component, OnDestroy, OnInit } from '@angular/core';
import { Filter } from '../../../shared/models/filter';
import { OfferService } from '../../../shared/services/offer/offer.service';
import { finalize, Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Offer } from '../../../shared/models/offer';
import { PropertyType } from '../../../shared/models/property-type';
import { OfferType } from '../../../shared/models/offer-type';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.scss'],
})
export class PlotComponent implements OnInit, OnDestroy {
  offers: Offer[];
  totalRecords: number;
  currentPage: number;
  dataLoad: boolean = false;
  parameterFilters: Filter[] = [];
  parameterIn: Filter[] = [];
  parameterValueIn: Filter[] = [];
  filters: Filter[] = [];
  defaultFilters: Filter[] = [
    {
      column: 'property_type_id',
      operator: '=',
      value: '',
    },
    {
      column: 'offer_type_id',
      operator: '=',
      value: '',
    },
  ];
  propertyTypes: PropertyType[] = [];
  offerTypes: OfferType[] = [];
  form: FormGroup;
  plotTypeOptions: any = [];
  fenceOptions: any = [];
  utilitiesOptions: any = [];
  drivewayTypeOptions: any;
  propertyTypeId: number;
  visibleFilterSidebar: boolean = false;
  offerType: string;
  routeSubscription: Subscription;

  constructor(
    private offerService: OfferService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      locality: [],
      areaPlotFrom: [],
      areaPlotTo: [],
      priceFrom: [],
      priceTo: [],
      plotType: [],
      fence: [],
      utilities: [],
      drivewayType: [],
    });
    this.setPropertyAndOfferTypes();
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  setPropertyAndOfferTypes() {
    this.offerService
      .getPropertyAndOfferTypes()
      .pipe(
        finalize(() => {
          this.getPropertyId();
          this.getParameters();
          this.getRouteParameters();
        })
      )
      .subscribe((value) => {
        this.propertyTypes = value.propertyTypes;
        this.offerTypes = value.offerTypes;
      });
  }

  getPropertyId() {
    this.propertyTypeId = this.propertyTypes.find(
      (x) => x.name === 'działka'
    )!.id;
  }

  setDefaultFilters() {
    this.defaultFilters[0].value = this.propertyTypes.find(
      (x) => x.name === 'działka'
    )!.id;
    this.defaultFilters[1].value = this.offerTypes.find(
      (x) => x.name === this.offerType
    )!.id;
    this.filters[0] = this.defaultFilters[0];
    this.filters[1] = this.defaultFilters[1];
  }

  getRouteParameters() {
    this.routeSubscription = this.route.params.subscribe((params: any) => {
      params.type === 'wynajem'
        ? (this.offerType = 'wynajem')
        : (this.offerType = 'sprzedaż');
      this.dataLoad = false;
      this.setDefaultFilters();
      this.getOffers(1);
    });
  }

  paginate(event: any) {
    if (this.currentPage !== event.page + 1) {
      this.getOffers(event.page + 1);
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  }

  getParameters() {
    this.offerService
      .getParametersForPropertyType(this.propertyTypeId)
      .subscribe((value) => {
        this.plotTypeOptions = value.find(
          (x) => x.name === 'typ działki'
        )!.parameter_values;
        this.fenceOptions = value.find(
          (x) => x.name === 'ogrodzenie'
        )!.parameter_values;
        this.drivewayTypeOptions = value.filter(
          (x) =>
            x.parameter_category !== null &&
            x.parameter_category.name === 'dojazd'
        );
        this.utilitiesOptions = value.filter(
          (x) =>
            x.parameter_category !== null &&
            x.parameter_category.name === 'media'
        );
      });
  }
  getOffers(page: number) {
    this.offerService
      .getOffers(
        page,
        this.filters,
        this.parameterFilters,
        this.parameterIn,
        this.parameterValueIn
      )
      .subscribe((value) => {
        this.totalRecords = value.offers.total;
        this.offers = value.offers.data;
        this.currentPage = value.offers.current_page;
        this.dataLoad = true;
      });
  }

  onSubmit() {
    this.clearFilters();
    this.form.setValue(this.form.value);
    if (
      this.form.controls['priceFrom'].value !== null &&
      this.form.controls['priceFrom'].value !== ''
    ) {
      this.filters.push({
        column: 'price',
        operator: '>=',
        value: +this.form.controls['priceFrom'].value,
      });
    }

    if (
      this.form.controls['priceTo'].value !== null &&
      this.form.controls['priceTo'].value !== ''
    ) {
      this.filters.push({
        column: 'price',
        operator: '<=',
        value: +this.form.controls['priceTo'].value,
      });
    }

    if (
      this.form.controls['areaPlotFrom'].value !== null &&
      this.form.controls['areaPlotFrom'].value !== ''
    ) {
      this.filters.push({
        column: 'area_square_meters',
        operator: '>=',
        value: +this.form.controls['areaPlotFrom'].value,
      });
    }

    if (
      this.form.controls['areaPlotTo'].value !== null &&
      this.form.controls['areaPlotTo'].value !== ''
    ) {
      this.filters.push({
        column: 'area_square_meters',
        operator: '<=',
        value: +this.form.controls['areaPlotTo'].value,
      });
    }

    if (
      this.form.controls['locality'].value !== null &&
      this.form.controls['locality'].value !== ''
    ) {
      this.filters.push({
        column: 'locality',
        operator: 'like',
        value: '%' + this.form.controls['locality'].value + '%',
      });
    }

    if (
      this.form.controls['fence'].value !== null &&
      this.form.controls['fence'].value !== ''
    ) {
      this.parameterValueIn.push({
        column: 'ogordzenie',
        operator: 'in',
        value: [this.form.controls['fence'].value],
      });
    }

    if (this.form.controls['utilities'].value !== null) {
      this.form.controls['utilities'].value.forEach((x: number) => {
        this.parameterIn.push({
          column: 'parameter_id',
          operator: '=',
          value: x,
        });
      });
    }

    if (this.form.controls['drivewayType'].value !== null) {
      this.form.controls['drivewayType'].value.forEach((x: number) => {
        this.parameterIn.push({
          column: 'parameter_id',
          operator: '=',
          value: x,
        });
      });
    }

    if (
      this.form.controls['plotType'].value !== null &&
      this.form.controls['plotType'].value.length > 0
    ) {
      this.parameterValueIn.push({
        column: 'typ działki',
        operator: 'in',
        value: this.form.controls['plotType'].value,
      });
    }

    this.visibleFilterSidebar = false;
    this.dataLoad = false;
    this.getOffers(1);
  }

  clearFilters() {
    this.filters = [];
    this.filters[0] = this.defaultFilters[0];
    this.filters[0] = this.defaultFilters[1];
    this.parameterValueIn = [];
    this.parameterFilters = [];
    this.parameterIn = [];
  }
  clearFormAndFilters() {
    this.clearFilters();
    this.form.reset();
    this.dataLoad = false;
    this.visibleFilterSidebar = false;
    this.getOffers(1);
  }
}
