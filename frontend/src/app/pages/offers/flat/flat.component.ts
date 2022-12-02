import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Filter } from '../../../shared/models/filter';
import { OfferService } from '../../../shared/services/offer/offer.service';
import { finalize, Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PropertyType } from '../../../shared/models/property-type';
import { OfferType } from '../../../shared/models/offer-type';
import { Offer } from '../../../shared/models/offer';

@Component({
  selector: 'app-flat',
  templateUrl: './flat.component.html',
  styleUrls: ['./flat.component.scss'],
})
export class FlatComponent implements OnInit, OnDestroy {
  offers: Offer[];
  totalRecords: number;
  currentPage: number;
  dataLoad: boolean = false;
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
  buildingTypeOptions: any = [];
  buildingMaterialsOptions: any = [];
  buildingCondition: any = [];
  windowsOptions: any = [];
  buildingSecurityOptions: any = [];
  heatingOptions: any = [];
  additionalInfOptions: any = [];
  formOfPropertyOptions: any = [];
  form: FormGroup;
  propertyTypeId: number;
  parameterFilters: Filter[] = [];
  parameterIn: Filter[] = [];
  parameterValueIn: Filter[] = [];
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
      areaFlatFrom: [],
      areaFlatTo: [],
      priceFrom: [],
      priceTo: [],
      floorFrom: [],
      floorTo: [],
      floorNumberFrom: [],
      floorNumberTo: [],
      roomsFrom: [],
      roomsTo: [],
      yearFrom: [],
      yearTo: [],
      buildingType: [],
      buildingMaterial: [],
      buildingCondition: [],
      windows: [],
      buildingSecurity: [],
      heating: [],
      formOfProperty: [],
      additionalInf: [],
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
      (x) => x.name === 'mieszkanie'
    )!.id;
  }

  setDefaultFilters() {
    this.defaultFilters[0].value = this.propertyTypes.find(
      (x) => x.name === 'mieszkanie'
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
        this.buildingTypeOptions = value.find(
          (x) => x.name === 'rodzaj zabudowy'
        )!.parameter_values;
        this.buildingMaterialsOptions = value.find(
          (x) => x.name === 'materiał budynku'
        )!.parameter_values;
        this.buildingCondition = value.find(
          (x) => x.name === 'stan wykończenia'
        )!.parameter_values;
        this.windowsOptions = value.find(
          (x) => x.name === 'okna'
        )!.parameter_values;
        this.heatingOptions = value.find(
          (x) => x.name === 'ogrzewanie'
        )!.parameter_values;
        this.formOfPropertyOptions = value.find(
          (x) => x.name === 'forma własności'
        )!.parameter_values;

        this.buildingSecurityOptions = value.filter(
          (x) =>
            x.parameter_category !== null &&
            x.parameter_category.name === 'zabezpieczenia budynku'
        );
        this.additionalInfOptions = value.filter(
          (x) =>
            x.parameter_category !== null &&
            x.parameter_category.name === 'informacje dodatkowe'
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

  clearFilters() {
    this.filters = [this.defaultFilters[0], this.defaultFilters[1]];
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
      this.form.controls['areaFlatFrom'].value !== null &&
      this.form.controls['areaFlatFrom'].value !== ''
    ) {
      this.filters.push({
        column: 'area_square_meters',
        operator: '>=',
        value: +this.form.controls['areaFlatFrom'].value,
      });
    }

    if (
      this.form.controls['areaFlatTo'].value !== null &&
      this.form.controls['areaFlatTo'].value !== ''
    ) {
      this.filters.push({
        column: 'area_square_meters',
        operator: '<=',
        value: +this.form.controls['areaFlatTo'].value,
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
      this.form.controls['floorNumberFrom'].value !== null &&
      this.form.controls['floorNumberFrom'].value !== ''
    ) {
      this.parameterFilters.push({
        column: 'liczba pięter',
        operator: '>=',
        value: +this.form.controls['floorNumberFrom'].value,
      });
    }

    if (
      this.form.controls['floorNumberTo'].value !== null &&
      this.form.controls['floorNumberTo'].value !== ''
    ) {
      this.parameterFilters.push({
        column: 'liczba pięter',
        operator: '<=',
        value: +this.form.controls['floorNumberTo'].value,
      });
    }

    if (
      this.form.controls['floorFrom'].value !== null &&
      this.form.controls['floorFrom'].value !== ''
    ) {
      this.parameterFilters.push({
        column: 'piętro',
        operator: '>=',
        value: +this.form.controls['floorFrom'].value,
      });
    }

    if (
      this.form.controls['floorTo'].value !== null &&
      this.form.controls['floorTo'].value !== ''
    ) {
      this.parameterFilters.push({
        column: 'piętro',
        operator: '<=',
        value: +this.form.controls['floorTo'].value,
      });
    }

    if (
      this.form.controls['roomsFrom'].value !== null &&
      this.form.controls['roomsFrom'].value !== ''
    ) {
      this.parameterFilters.push({
        column: 'liczba pokoi',
        operator: '>=',
        value: +this.form.controls['roomsFrom'].value,
      });
    }

    if (
      this.form.controls['roomsTo'].value !== null &&
      this.form.controls['roomsTo'].value !== ''
    ) {
      this.parameterFilters.push({
        column: 'liczba pokoi',
        operator: '<=',
        value: +this.form.controls['roomsTo'].value,
      });
    }

    if (
      this.form.controls['yearFrom'].value !== null &&
      this.form.controls['yearFrom'].value !== ''
    ) {
      this.parameterFilters.push({
        column: 'rok budowy',
        operator: '>=',
        value: +this.form.controls['yearFrom'].value,
      });
    }

    if (
      this.form.controls['yearTo'].value !== null &&
      this.form.controls['yearTo'].value !== ''
    ) {
      this.parameterFilters.push({
        column: 'rok budowy',
        operator: '<=',
        value: +this.form.controls['yearTo'].value,
      });
    }

    if (
      this.form.controls['buildingType'].value !== null &&
      this.form.controls['buildingType'].value.length > 0
    ) {
      this.parameterValueIn.push({
        column: 'rodzaj zabudowy',
        operator: 'in',
        value: this.form.controls['buildingType'].value,
      });
    }

    if (
      this.form.controls['buildingMaterial'].value !== null &&
      this.form.controls['buildingMaterial'].value.length > 0
    ) {
      this.parameterValueIn.push({
        column: 'materiał budynku',
        operator: 'in',
        value: this.form.controls['buildingMaterial'].value,
      });
    }

    if (
      this.form.controls['buildingCondition'].value !== null &&
      this.form.controls['buildingCondition'].value.length > 0
    ) {
      this.parameterValueIn.push({
        column: 'stan wykończenia',
        operator: 'in',
        value: this.form.controls['buildingCondition'].value,
      });
    }

    if (
      this.form.controls['windows'].value !== null &&
      this.form.controls['windows'].value.length > 0
    ) {
      this.parameterValueIn.push({
        column: 'okna',
        operator: 'in',
        value: this.form.controls['windows'].value,
      });
    }

    if (this.form.controls['heating'].value !== null) {
      this.parameterValueIn.push({
        column: 'ogrzewanie',
        operator: 'in',
        value: this.form.controls['heating'].value,
      });
    }

    if (this.form.controls['formOfProperty'].value !== null) {
      this.parameterValueIn.push({
        column: 'forma własności',
        operator: 'in',
        value: this.form.controls['formOfProperty'].value,
      });
    }

    if (this.form.controls['buildingSecurity'].value !== null) {
      this.form.controls['buildingSecurity'].value.forEach((x: number) => {
        this.parameterIn.push({
          column: 'parameter_id',
          operator: '=',
          value: x,
        });
      });
    }
    if (this.form.controls['additionalInf'].value !== null) {
      this.form.controls['additionalInf'].value.forEach((x: number) => {
        this.parameterIn.push({
          column: 'parameter_id',
          operator: '=',
          value: x,
        });
      });
    }

    this.dataLoad = false;
    this.visibleFilterSidebar = false;
    this.getOffers(1);
  }
}
