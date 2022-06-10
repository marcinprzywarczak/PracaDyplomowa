import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared/services/api/api.service';
import { Filter } from '../../../shared/models/filter';
import { finalize, switchMap } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.scss'],
})
export class HouseComponent implements OnInit {
  offers: any;
  totalRecords: number;
  currentPage: number;
  dataLoad: boolean = false;
  filters: Filter[] = [];
  parameterFilters: Filter[] = [];
  parameterIn: Filter[] = [];
  parameterValueIn: Filter[] = [];
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
  propertyTypeId: number;
  propertyTypes: any = [];
  offerTypes: any = [];
  ogrzewanieOptions: any = [];
  buildingTypeOptions: any = [];
  buildingMaterialsOptions: any = [];
  roofingTypeOptions: any = [];
  buildingCondition: any = [];
  windowsOptions: any = [];
  buildingSecurityOptions: any = [];
  fenceOptions: any = [];
  heatingOptions: any = [];
  utilitiesOptions: any = [];
  additionalInfOptions: any = [];
  form: FormGroup;
  showFilters: boolean = false;
  visibleFilterSidebar: boolean;
  locality: string = '';
  offerType: string;
  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      ogrzewanie: [],
      locality: [this.locality],
      areaHouseFrom: [],
      areaHouseTo: [],
      areaPlotFrom: [],
      areaPlotTo: [],
      priceFrom: [],
      priceTo: [],
      floorFrom: [],
      floorTo: [],
      roomsFrom: [],
      roomsTo: [],
      yearFrom: [],
      yearTo: [],
      buildingType: [],
      buildingMaterial: [],
      roofingType: [],
      buildingCondition: [],
      windows: [],
      buildingSecurity: [],
      fence: [],
      heating: [],
      utilities: [],
      additionalInf: [],
    });
    this.apiService
      .getPropertyAndOfferTypes()
      .pipe(
        finalize(() => {
          this.getPropertyId();
          this.getParameters();
          this.getRouteParameters();
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
  getRouteParameters() {
    this.route.params.subscribe((params: any) => {
      params.type === 'wynajem'
        ? (this.offerType = 'wynajem')
        : (this.offerType = 'sprzedaż');
      this.dataLoad = false;
      this.setDefaultFilters();
      this.getOffers(1);
    });
  }
  getParameters() {
    this.apiService
      .getParametersForPropertyType(this.propertyTypeId)
      .subscribe((value: any) => {
        this.buildingTypeOptions = value.find(
          (x: any) => x.name === 'rodzaj zabudowy'
        ).parameter_values;
        this.buildingMaterialsOptions = value.find(
          (x: any) => x.name === 'materiał budynku'
        ).parameter_values;
        this.roofingTypeOptions = value.find(
          (x: any) => x.name === 'pokrycie dachu'
        ).parameter_values;
        this.buildingCondition = value.find(
          (x: any) => x.name === 'stan wykończenia'
        ).parameter_values;
        this.windowsOptions = value.find(
          (x: any) => x.name === 'okna'
        ).parameter_values;

        this.buildingSecurityOptions = value.filter(
          (x: any) =>
            x.parameter_category !== null &&
            x.parameter_category.name === 'zabezpieczenia budynku'
        );
        this.fenceOptions = value.filter(
          (x: any) =>
            x.parameter_category !== null &&
            x.parameter_category.name === 'ogrodzenie'
        );
        this.heatingOptions = value.filter(
          (x: any) =>
            x.parameter_category !== null &&
            x.parameter_category.name === 'ogrzewanie'
        );
        this.utilitiesOptions = value.filter(
          (x: any) =>
            x.parameter_category !== null &&
            x.parameter_category.name === 'media'
        );
        this.additionalInfOptions = value.filter(
          (x: any) =>
            x.parameter_category !== null &&
            x.parameter_category.name === 'informacje dodatkowe'
        );
        this.ogrzewanieOptions = value.filter(
          (x: any) =>
            x.parameter_category !== null &&
            x.parameter_category.name === 'ogrzewanie'
        );
      });
  }
  getPropertyId() {
    this.propertyTypeId = this.propertyTypes.find(
      (x: any) => x.name === 'dom'
    ).id;
  }
  setDefaultFilters() {
    this.defaultFilters[0].value = this.propertyTypes.find(
      (x: any) => x.name === 'dom'
    ).id;
    this.defaultFilters[1].value = this.offerTypes.find(
      (x: any) => x.name === this.offerType
    ).id;
    this.filters[0] = this.defaultFilters[0];
    this.filters[1] = this.defaultFilters[1];
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
      this.form.controls['areaHouseFrom'].value !== null &&
      this.form.controls['areaHouseFrom'].value !== ''
    ) {
      this.form.controls['areaHouseFrom'].setValue(
        this.form.controls['areaHouseFrom'].value
      );
      this.filters.push({
        column: 'area_square_meters',
        operator: '>=',
        value: +this.form.controls['areaHouseFrom'].value,
      });
    } else {
      this.form.controls['areaHouseFrom'].setValue(null);
    }

    if (
      this.form.controls['areaHouseTo'].value !== null &&
      this.form.controls['areaHouseTo'].value !== ''
    ) {
      this.form.controls['areaHouseTo'].setValue(
        this.form.controls['areaHouseTo'].value
      );
      this.filters.push({
        column: 'area_square_meters',
        operator: '<=',
        value: +this.form.controls['areaHouseTo'].value,
      });
    } else {
      this.form.controls['areaHouseTo'].setValue(null);
    }

    if (
      this.form.controls['locality'].value !== null &&
      this.form.controls['locality'].value !== ''
    ) {
      this.form.controls['locality'].setValue(
        this.form.controls['locality'].value
      );
      this.locality = this.form.controls['locality'].value;
      this.filters.push({
        column: 'locality',
        operator: 'like',
        value: '%' + this.form.controls['locality'].value + '%',
      });
    } else {
      this.form.controls['locality'].setValue(null);
    }

    if (
      this.form.controls['areaPlotFrom'].value !== null &&
      this.form.controls['areaPlotFrom'].value !== ''
    ) {
      this.form.controls['areaPlotFrom'].setValue(
        this.form.controls['areaPlotFrom'].value
      );
      this.parameterFilters.push({
        column: 'powierzchnia działki',
        operator: '>=',
        value: +this.form.controls['areaPlotFrom'].value,
      });
    } else {
      this.form.controls['areaPlotFrom'].setValue(null);
    }

    if (
      this.form.controls['areaPlotTo'].value !== null &&
      this.form.controls['areaPlotTo'].value !== ''
    ) {
      this.form.controls['areaPlotTo'].setValue(
        this.form.controls['areaPlotTo'].value
      );
      this.parameterFilters.push({
        column: 'powierzchnia działki',
        operator: '<=',
        value: +this.form.controls['areaPlotTo'].value,
      });
    } else {
      this.form.controls['areaPlotTo'].setValue(null);
    }

    if (
      this.form.controls['floorFrom'].value !== null &&
      this.form.controls['floorFrom'].value !== ''
    ) {
      this.form.controls['floorFrom'].setValue(
        this.form.controls['floorFrom'].value
      );
      this.parameterFilters.push({
        column: 'liczba pięter',
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
        column: 'liczba pięter',
        operator: '<=',
        value: +this.form.controls['floorTo'].value,
      });
    } else {
      this.form.controls['floorTo'].setValue(null);
    }

    if (
      this.form.controls['roomsFrom'].value !== null &&
      this.form.controls['roomsFrom'].value !== ''
    ) {
      this.form.controls['roomsFrom'].setValue(
        this.form.controls['roomsFrom'].value
      );
      this.parameterFilters.push({
        column: 'liczba pokoi',
        operator: '>=',
        value: +this.form.controls['roomsFrom'].value,
      });
    } else {
      this.form.controls['roomsFrom'].setValue(null);
    }

    if (
      this.form.controls['roomsTo'].value !== null &&
      this.form.controls['roomsTo'].value !== ''
    ) {
      this.form.controls['roomsTo'].setValue(
        this.form.controls['roomsTo'].value
      );
      this.parameterFilters.push({
        column: 'liczba pokoi',
        operator: '<=',
        value: +this.form.controls['roomsTo'].value,
      });
    } else {
      this.form.controls['roomsTo'].setValue(null);
    }

    if (
      this.form.controls['yearFrom'].value !== null &&
      this.form.controls['yearFrom'].value !== ''
    ) {
      this.form.controls['yearFrom'].setValue(
        this.form.controls['yearFrom'].value
      );
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
      this.form.controls['yearTo'].setValue(this.form.controls['yearTo'].value);
      this.parameterFilters.push({
        column: 'rok budowy',
        operator: '<=',
        value: +this.form.controls['yearTo'].value,
      });
    } else {
      this.form.controls['yearTo'].setValue(null);
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
      this.form.controls['buildingMaterial'].value !== null &&
      this.form.controls['buildingMaterial'].value.length > 0
    ) {
      this.form.controls['buildingMaterial'].setValue(
        this.form.controls['buildingMaterial'].value
      );
      this.parameterValueIn.push({
        column: 'materiał budynku',
        operator: 'in',
        value: this.form.controls['buildingMaterial'].value,
      });
    } else {
      this.form.controls['buildingMaterial'].setValue(null);
    }

    if (
      this.form.controls['roofingType'].value !== null &&
      this.form.controls['roofingType'].value.length > 0
    ) {
      this.form.controls['roofingType'].setValue(
        this.form.controls['roofingType'].value
      );
      this.parameterValueIn.push({
        column: 'pokrycie dachu',
        operator: 'in',
        value: this.form.controls['roofingType'].value,
      });
    } else {
      this.form.controls['roofingType'].setValue(null);
    }

    if (
      this.form.controls['buildingCondition'].value !== null &&
      this.form.controls['buildingCondition'].value.length > 0
    ) {
      this.form.controls['buildingCondition'].setValue(
        this.form.controls['buildingCondition'].value
      );
      this.parameterValueIn.push({
        column: 'stan wykończenia',
        operator: 'in',
        value: this.form.controls['buildingCondition'].value,
      });
    } else {
      this.form.controls['buildingCondition'].setValue(null);
    }

    if (
      this.form.controls['windows'].value !== null &&
      this.form.controls['windows'].value.length > 0
    ) {
      this.form.controls['windows'].setValue(
        this.form.controls['windows'].value
      );
      this.parameterValueIn.push({
        column: 'okna',
        operator: 'in',
        value: this.form.controls['windows'].value,
      });
    } else {
      this.form.controls['windows'].setValue(null);
    }

    if (this.form.controls['buildingSecurity'].value !== null) {
      this.form.controls['buildingSecurity'].setValue(
        this.form.controls['buildingSecurity'].value
      );
      this.form.controls['buildingSecurity'].value.forEach((x: number) => {
        this.parameterIn.push({
          column: 'parameter_id',
          operator: '=',
          value: x,
        });
      });
    } else {
      this.form.controls['buildingSecurity'].setValue(null);
    }

    if (this.form.controls['fence'].value !== null) {
      this.form.controls['fence'].setValue(this.form.controls['fence'].value);
      this.form.controls['fence'].value.forEach((x: number) => {
        this.parameterIn.push({
          column: 'parameter_id',
          operator: '=',
          value: x,
        });
      });
    } else {
      this.form.controls['fence'].setValue(null);
    }

    if (this.form.controls['heating'].value !== null) {
      this.form.controls['heating'].setValue(
        this.form.controls['heating'].value
      );
      this.form.controls['heating'].value.forEach((x: number) => {
        this.parameterIn.push({
          column: 'parameter_id',
          operator: '=',
          value: x,
        });
      });
    } else {
      this.form.controls['heating'].setValue(null);
    }

    if (this.form.controls['utilities'].value !== null) {
      this.form.controls['utilities'].setValue(
        this.form.controls['utilities'].value
      );
      this.form.controls['utilities'].value.forEach((x: number) => {
        this.parameterIn.push({
          column: 'parameter_id',
          operator: '=',
          value: x,
        });
      });
    } else {
      this.form.controls['utilities'].setValue(null);
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

    this.dataLoad = false;
    this.visibleFilterSidebar = false;
    this.getOffers(1);
  }
}
