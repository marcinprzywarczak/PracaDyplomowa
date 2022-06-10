import { Component, OnInit } from '@angular/core';
import { Filter } from '../../../shared/models/filter';
import { ApiService } from '../../../shared/services/api/api.service';
import { finalize } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-room-rent',
  templateUrl: './room-rent.component.html',
  styleUrls: ['./room-rent.component.scss'],
})
export class RoomRentComponent implements OnInit {
  offers: any;
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
  propertyTypes: any = [];
  offerTypes: any = [];
  form: FormGroup;
  buildingTypeOptions: any = [];
  roomTypeOptions: any = [];
  equipmentOptions: any = [];
  additionalInfOptions: any = [];
  propertyTypeId: number;
  visibleFilterSidebar: boolean = false;
  constructor(
    private apiService: ApiService,
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
    this.apiService
      .getPropertyAndOfferTypes()
      .pipe(
        finalize(() => {
          this.getPropertyId();
          this.setDefaultFilters();
          this.getParameters();
          this.getOffers(1);
        })
      )
      .subscribe((value: any) => {
        this.propertyTypes = value.propertyTypes.map((res: any) => {
          return {
            id: res.id,
            name: res.name,
          };
        });
        this.offerTypes = value.offerTypes.map((res: any) => {
          return {
            id: res.id,
            name: res.name,
          };
        });
      });
  }

  getPropertyId() {
    this.propertyTypeId = this.propertyTypes.find(
      (x: any) => x.name === 'pokój'
    ).id;
  }

  setDefaultFilters() {
    this.defaultFilters[0].value = this.propertyTypes.find(
      (x: any) => x.name === 'pokój'
    ).id;
    this.defaultFilters[1].value = this.offerTypes.find(
      (x: any) => x.name === 'wynajem'
    ).id;
    this.filters[0] = this.defaultFilters[0];
    this.filters[1] = this.defaultFilters[1];
  }

  getParameters() {
    this.apiService
      .getParametersForPropertyType(this.propertyTypeId)
      .subscribe((value: any) => {
        this.buildingTypeOptions = value.find(
          (x: any) => x.name === 'rodzaj zabudowy'
        ).parameter_values;
        this.roomTypeOptions = value.find(
          (x: any) => x.name === 'liczba osób w pokoju'
        ).parameter_values;

        this.additionalInfOptions = value.filter(
          (x: any) =>
            x.parameter_category !== null &&
            x.parameter_category.name === 'informacje dodatkowe'
        );
        this.equipmentOptions = value.filter(
          (x: any) =>
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
    this.apiService
      .getOffers(
        page,
        this.filters,
        this.parameterFilters,
        this.parameterIn,
        this.parameterValueIn
      )
      .subscribe((value: any) => {
        this.totalRecords = value.offers.total;
        this.offers = value.offers.data;
        this.currentPage = value.offers.curent_page;
        this.dataLoad = true;
      });
  }
  onSubmit() {
    this.clearFilters();
    if (
      this.form.controls['priceFrom'].value !== null &&
      this.form.controls['priceFrom'].value !== ''
    ) {
      this.form.controls['priceFrom'].setValue(
        this.form.controls['priceFrom'].value
      );
      this.filters.push({
        column: 'price',
        operator: '>=',
        value: +this.form.controls['priceFrom'].value,
      });
    } else {
      this.form.controls['priceFrom'].setValue(null);
    }

    if (
      this.form.controls['priceTo'].value !== null &&
      this.form.controls['priceTo'].value !== ''
    ) {
      this.form.controls['priceTo'].setValue(
        this.form.controls['priceTo'].value
      );
      this.filters.push({
        column: 'price',
        operator: '<=',
        value: +this.form.controls['priceTo'].value,
      });
    } else {
      this.form.controls['priceTo'].setValue(null);
    }

    if (
      this.form.controls['areaRoomFrom'].value !== null &&
      this.form.controls['areaRoomFrom'].value !== ''
    ) {
      this.form.controls['areaRoomFrom'].setValue(
        this.form.controls['areaRoomFrom'].value
      );
      this.filters.push({
        column: 'area_square_meters',
        operator: '>=',
        value: +this.form.controls['areaRoomFrom'].value,
      });
    } else {
      this.form.controls['areaRoomFrom'].setValue(null);
    }

    if (
      this.form.controls['areaRoomTo'].value !== null &&
      this.form.controls['areaRoomTo'].value !== ''
    ) {
      this.form.controls['areaRoomTo'].setValue(
        this.form.controls['areaRoomTo'].value
      );
      this.filters.push({
        column: 'area_square_meters',
        operator: '<=',
        value: +this.form.controls['areaRoomTo'].value,
      });
    } else {
      this.form.controls['areaRoomTo'].setValue(null);
    }

    if (
      this.form.controls['locality'].value !== null &&
      this.form.controls['locality'].value !== ''
    ) {
      this.form.controls['locality'].setValue(
        this.form.controls['locality'].value
      );
      this.filters.push({
        column: 'locality',
        operator: 'like',
        value: '%' + this.form.controls['locality'].value + '%',
      });
    } else {
      this.form.controls['locality'].setValue(null);
    }

    if (
      this.form.controls['floorNumberFrom'].value !== null &&
      this.form.controls['floorNumberFrom'].value !== ''
    ) {
      this.form.controls['floorNumberFrom'].setValue(
        this.form.controls['floorNumberFrom'].value
      );
      this.parameterFilters.push({
        column: 'liczba pięter',
        operator: '>=',
        value: +this.form.controls['floorNumberFrom'].value,
      });
    } else {
      this.form.controls['floorNumberFrom'].setValue(null);
    }

    if (
      this.form.controls['floorNumberTo'].value !== null &&
      this.form.controls['floorNumberTo'].value !== ''
    ) {
      this.form.controls['floorNumberTo'].setValue(
        this.form.controls['floorNumberTo'].value
      );
      this.parameterFilters.push({
        column: 'liczba pięter',
        operator: '<=',
        value: +this.form.controls['floorNumberTo'].value,
      });
    } else {
      this.form.controls['floorNumberTo'].setValue(null);
    }

    if (
      this.form.controls['floorFrom'].value !== null &&
      this.form.controls['floorFrom'].value !== ''
    ) {
      this.form.controls['floorFrom'].setValue(
        this.form.controls['floorFrom'].value
      );
      this.parameterFilters.push({
        column: 'piętro',
        operator: '>=',
        value: +this.form.controls['floorFrom'].value,
      });
    } else {
      this.form.controls['floorFrom'].setValue(null);
    }

    if (
      this.form.controls['floorTo'].value !== null &&
      this.form.controls['floorTo'].value !== ''
    ) {
      this.form.controls['floorTo'].setValue(
        this.form.controls['floorTo'].value
      );
      this.parameterFilters.push({
        column: 'piętro',
        operator: '<=',
        value: +this.form.controls['floorTo'].value,
      });
    } else {
      this.form.controls['floorTo'].setValue(null);
    }

    if (
      this.form.controls['buildingType'].value !== null &&
      this.form.controls['buildingType'].value.length > 0
    ) {
      this.form.controls['buildingType'].setValue(
        this.form.controls['buildingType'].value
      );
      this.parameterValueIn.push({
        column: 'rodzaj zabudowy',
        operator: 'in',
        value: this.form.controls['buildingType'].value,
      });
    } else {
      this.form.controls['buildingType'].setValue(null);
    }

    if (
      this.form.controls['roomType'].value !== null &&
      this.form.controls['roomType'].value.length > 0
    ) {
      this.form.controls['roomType'].setValue(
        this.form.controls['roomType'].value
      );
      this.parameterValueIn.push({
        column: 'liczba osób w pokoju',
        operator: 'in',
        value: this.form.controls['roomType'].value,
      });
    } else {
      this.form.controls['roomType'].setValue(null);
    }

    if (this.form.controls['additionalInf'].value !== null) {
      this.form.controls['additionalInf'].setValue(
        this.form.controls['additionalInf'].value
      );
      this.form.controls['additionalInf'].value.forEach((x: number) => {
        this.parameterIn.push({
          column: 'parameter_id',
          operator: '=',
          value: x,
        });
      });
    } else {
      this.form.controls['additionalInf'].setValue(null);
    }

    if (this.form.controls['equipment'].value !== null) {
      this.form.controls['equipment'].setValue(
        this.form.controls['equipment'].value
      );
      this.form.controls['equipment'].value.forEach((x: number) => {
        this.parameterIn.push({
          column: 'parameter_id',
          operator: '=',
          value: x,
        });
      });
    } else {
      this.form.controls['equipment'].setValue(null);
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
