import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../shared/services/login/login.service";
import {Router} from "@angular/router";
import {ApiService} from "../../shared/services/api.service";

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
  constructor(private loginService: LoginService,private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    //this.loginService.csrf();
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
  }
  logout(){
    this.loginService.logout().subscribe(response => {
      if(response.status === 204){
        localStorage.removeItem('isLogged');
        window.location.reload();
      }
    });

  }

  sprawdz(){
    this.loginService.csrf().subscribe(() => {
      this.loginService.isLogged().subscribe(value => {
        console.log(value);
      });
    });

  }

  test(){
    this.loginService.test().subscribe(value => {
      console.log(value);
    });
  }
}
