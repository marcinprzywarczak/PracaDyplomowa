import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../shared/services/login/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isLogged: boolean;
  name: string;
  email: string;
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.isLogged = !!localStorage.getItem('isLogged');
    if(this.isLogged)
    {
      this.loginService.test().subscribe(value => {
        console.log(value);
        this.name = value.name;
        this.email = value.email;
      })
    }
  }
  logout(){
    this.loginService.logout().subscribe(value => {
      if(value.success){
        localStorage.removeItem('isLogged');
        window.location.reload();
      }
    });

  }

  sprawdz(){
    this.loginService.isLogged().subscribe(value => {
      console.log(value);
    });
  }

  test(){
    this.loginService.test().subscribe(value => {
      console.log(value);
    });
  }
}
