import { Component, OnInit } from '@angular/core';
import {Filter} from "../../../shared/models/filter";
import {ApiService} from "../../../shared/services/api/api.service";
import {finalize} from "rxjs";

@Component({
  selector: 'app-plot-sell',
  templateUrl: './plot-sell.component.html',
  styleUrls: ['./plot-sell.component.scss']
})
export class PlotSellComponent implements OnInit {
  offers: any;
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
  propertyTypes: any = [];
  offerTypes: any = [];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getPropertyAndOfferTypes()
      .pipe(
        finalize(() => {
          this.setDefaultFilters();
          this.getOffers(1);
        })
      )
      .subscribe((value:any) => {
        this.propertyTypes = value.propertyTypes.map((res: any) => {
          return {
            id: res.id,
            name: res.name,
          }
        });
        this.offerTypes = value.offerTypes.map((res:any) => {
          return {
            id: res.id,
            name: res.name,
          }
        })
      });
  }

  setDefaultFilters(){
    this.defaultFilters[0].value = this.propertyTypes.find((x:any) => x.name === 'działka').id;
    this.defaultFilters[1].value = this.offerTypes.find((x:any) => x.name === 'sprzedaż').id;
    this.filters = this.defaultFilters;
  }
  paginate(event: any){
    if(this.currentPage !== (event.page+1)){
      this.getOffers(event.page + 1);
    }
  }

  getOffers(page: number){
    this.apiService.getOffers(page, this.filters).subscribe((value:any) => {
      this.totalRecords = value.offers.total;
      this.offers = value.offers.data;
      this.currentPage = value.offers.curent_page;
      this.dataLoad = true;
    });
  }
}
