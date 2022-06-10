import { Component, OnInit } from '@angular/core';
import { Filter } from '../../../shared/models/filter';
import { ApiService } from '../../../shared/services/api/api.service';
import { finalize } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.scss'],
})
export class PlotComponent implements OnInit {
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
  plotTypeOptions: any = [];
  fenceOptions: any = [];
  utilitiesOptions: any = [];
  drivewayTypeOptions: any;
  propertyTypeId: number;
  visibleFilterSidebar: boolean = false;
  offerType: string;
  constructor(
    private apiService: ApiService,
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

  getPropertyId() {
    this.propertyTypeId = this.propertyTypes.find(
      (x: any) => x.name === 'działka'
    ).id;
  }

  setDefaultFilters() {
    this.defaultFilters[0].value = this.propertyTypes.find(
      (x: any) => x.name === 'działka'
    ).id;
    this.defaultFilters[1].value = this.offerTypes.find(
      (x: any) => x.name === this.offerType
    ).id;
    this.filters[0] = this.defaultFilters[0];
    this.filters[1] = this.defaultFilters[1];
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
    this.apiService
      .getParametersForPropertyType(this.propertyTypeId)
      .subscribe((value: any) => {
        this.plotTypeOptions = value.find(
          (x: any) => x.name === 'typ działki'
        ).parameter_values;
        this.fenceOptions = value.find(
          (x: any) => x.name === 'ogrodzenie'
        ).parameter_values;
        this.drivewayTypeOptions = value.filter(
          (x: any) =>
            x.parameter_category !== null &&
            x.parameter_category.name === 'dojazd'
        );
        this.utilitiesOptions = value.filter(
          (x: any) =>
            x.parameter_category !== null &&
            x.parameter_category.name === 'media'
        );
      });
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
      this.form.controls['areaPlotFrom'].value !== null &&
      this.form.controls['areaPlotFrom'].value !== ''
    ) {
      this.form.controls['areaPlotFrom'].setValue(
        this.form.controls['areaPlotFrom'].value
      );
      this.filters.push({
        column: 'area_square_meters',
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
      this.filters.push({
        column: 'area_square_meters',
        operator: '<=',
        value: +this.form.controls['areaPlotTo'].value,
      });
    } else {
      this.form.controls['areaPlotTo'].setValue(null);
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
      this.form.controls['fence'].value !== null &&
      this.form.controls['fence'].value !== ''
    ) {
      this.form.controls['fence'].setValue(this.form.controls['fence'].value);
      this.parameterValueIn.push({
        column: 'ogordzenie',
        operator: 'in',
        value: [this.form.controls['fence'].value],
      });
    } else {
      this.form.controls['fence'].setValue(null);
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

    if (this.form.controls['drivewayType'].value !== null) {
      this.form.controls['drivewayType'].setValue(
        this.form.controls['drivewayType'].value
      );
      this.form.controls['drivewayType'].value.forEach((x: number) => {
        this.parameterIn.push({
          column: 'parameter_id',
          operator: '=',
          value: x,
        });
      });
    } else {
      this.form.controls['drivewayType'].setValue(null);
    }

    if (
      this.form.controls['plotType'].value !== null &&
      this.form.controls['plotType'].value.length > 0
    ) {
      this.form.controls['plotType'].setValue(
        this.form.controls['plotType'].value
      );
      this.parameterValueIn.push({
        column: 'typ działki',
        operator: 'in',
        value: this.form.controls['plotType'].value,
      });
    } else {
      this.form.controls['plotType'].setValue(null);
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
