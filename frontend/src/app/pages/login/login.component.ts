import {AfterContentInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ApiService} from "../../shared/services/api/api.service";
import {LoginService} from "../../shared/services/login/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  errors: any = [];
  error: any;
  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      email: [],
      password: [],
    })
  }

  get f() {
    return this.form.controls;
  }
  onSubmit(){
    this.loginService.csrf().subscribe(()=>{
      this.loginService.login(this.form.controls['email'].value, this.form.controls['password'].value).subscribe({
        next: value => {
          if(value.error){
            this.error = value.error;
            this.errors = [];
          }
          else{
            console.log(value);
            localStorage.setItem('isLogged', 'true');
            localStorage.setItem('user', JSON.stringify(value.user));
           window.location.href="/dashboard";
          }
        },
        error: err => {
          this.errors = err.error.errors;
          this.error = '';
          //console.log('err', err.error.errors)
        }
      });
    })

  }


  // test2(){
  //   this.apiService.test2();
  // }
  //
  // wyloguj(){
  //   this.apiService.wyloguj();
  // }
}
