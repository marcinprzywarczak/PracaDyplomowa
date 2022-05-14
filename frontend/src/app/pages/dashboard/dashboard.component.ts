import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../shared/services/login/login.service";
import {Router} from "@angular/router";
import {ApiService} from "../../shared/services/api/api.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isLogged: boolean;
  name: string;
  email: string;
  avatar_url: string;
  isFirmAccount: boolean;
  firmName: string;
  offers: any;
  totalRecords: number;
  currentPage: number;
  dataLoad: boolean = false;
  constructor(private loginService: LoginService,private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.isLogged = !!localStorage.getItem('isLogged');
    if(this.isLogged)
    {
      this.loginService.test().subscribe(value => {
        console.log(value);
        this.name = value.user.first_name + ' ' + value.user.sure_name;
        this.avatar_url = value.user.avatar;
        this.email = value.user.email;
        this.isFirmAccount = value.user.firm !== null;
        this.firmName = this.isFirmAccount ? value.user.firm.name : '';
        console.log(this.isFirmAccount);
      })
    }
    this.apiService.getOffers(1).subscribe((value:any) => {
      console.log(value.offers);
      this.totalRecords = value.offers.total;
      this.offers = value.offers.data;
      this.currentPage = value.offers.curent_page;
      this.dataLoad = true;
    })
  }



  paginate(event: any){
    if(this.currentPage !== (event.page+1)){
      this.apiService.getOffers(event.page + 1).subscribe((value:any) => {
        this.offers = value.offers.data;
      });
      this.currentPage = (event.page+1);
    }
  }
}
