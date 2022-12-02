import { Component, OnInit } from '@angular/core';
import { Filter } from '../../../shared/models/filter';
import { OfferService } from '../../../shared/services/offer/offer.service';
import { finalize, Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Offer } from '../../../shared/models/offer';
import { PropertyType } from '../../../shared/models/property-type';
import { OfferType } from '../../../shared/models/offer-type';

@Component({
  selector: 'app-room-rent',
  templateUrl: './room-rent.component.html',
  styleUrls: ['./room-rent.component.scss'],
})
export class RoomRentComponent implements OnInit {
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
  buildingTypeOptions: any = [];
  roomTypeOptions: any = [];
  equipmentOptions: any = [];
  additionalInfOptions: any = [];
  propertyTypeId: number;
  visibleFilterSidebar: boolean = false;

  constructor(
    private offerService: OfferService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      locality: [],
      areaRoomFrom: [],
      areaRoomTo: [],
      priceFrom: [],
      priceTo: [],
      floorFrom: [],
      floorTo: [],
      floorNumberFrom: [],
      floorNumberTo: [],
      buildingType: [],
      roomType: [],
      equipment: [],
      additionalInf: [],
    });
    this.setPropertyAndOfferTypes();
  }

  setPropertyAndOfferTypes() {
    this.offerService
      .getPropertyAndOfferTypes()
      .pipe(
        finalize(() => {
          this.getPropertyId();
          this.setDefaultFilters();
          this.getParameters();
          this.getOffers(1);
        })
      )
      .subscribe((value) => {
        this.propertyTypes = value.propertyTypes;
        this.offerTypes = value.offerTypes;
      });
  }

  getPropertyId() {
    this.propertyTypeId = this.propertyTypes.find(
      (x) => x.name === 'pokój'
    )!.id;
  }

  setDefaultFilters() {
    this.defaultFilters[0].value = this.propertyTypes.find(
      (x) => x.name === 'pokój'
    )!.id;
    this.defaultFilters[1].value = this.offerTypes.find(
      (x) => x.name === 'wynajem'
    )!.id;
    this.filters[0] = this.defaultFilters[0];
    this.filters[1] = this.defaultFilters[1];
  }

  getParameters() {
    this.offerService
      .getParametersForPropertyType(this.propertyTypeId)
      .subscribe((value) => {
        this.buildingTypeOptions = value.find(
          (x) => x.name === 'rodzaj zabudowy'
        )!.parameter_values;
        this.roomTypeOptions = value.find(
          (x) => x.name === 'liczba osób w pokoju'
        )!.parameter_values;

        this.additionalInfOptions = value.filter(
          (x) =>
            x.parameter_category !== null &&
            x.parameter_category.name === 'informacje dodatkowe'
        );
        this.equipmentOptions = value.filter(
          (x) =>
            x.parameter_category !== null &&
            x.parameter_category.name === 'wyposażenie'
        );
      });
  }

  paginate(event: any) {
    if (this.currentPage !== event.page + 1) {
      this.getOffers(event.page + 1);
    }
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
    this.form.setValue(this.form.value);
    this.clearFilters();
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
      this.form.controls['areaRoomFrom'].value !== null &&
      this.form.controls['areaRoomFrom'].value !== ''
    ) {
      this.filters.push({
        column: 'area_square_meters',
        operator: '>=',
        value: +this.form.controls['areaRoomFrom'].value,
      });
    }

    if (
      this.form.controls['areaRoomTo'].value !== null &&
      this.form.controls['areaRoomTo'].value !== ''
    ) {
      this.filters.push({
        column: 'area_square_meters',
        operator: '<=',
        value: +this.form.controls['areaRoomTo'].value,
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
      this.form.controls['roomType'].value !== null &&
      this.form.controls['roomType'].value.length > 0
    ) {
      this.parameterValueIn.push({
        column: 'liczba osób w pokoju',
        operator: 'in',
        value: this.form.controls['roomType'].value,
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

    if (this.form.controls['equipment'].value !== null) {
      this.form.controls['equipment'].value.forEach((x: number) => {
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

  clearFilters() {
    this.filters = [];
    this.filters[0] = this.defaultFilters[0];
    this.filters[1] = this.defaultFilters[1];
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
