import {AfterContentInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ApiService} from "../../shared/services/api.service";
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
    this.loginService.login(this.form.controls['email'].value, this.form.controls['password'].value).subscribe({
      next: value => {
        if(value.success){
          this.router.navigate(['/dashboard']);
          localStorage.setItem('isLogged', 'true');
        }
        if(value.error){
          this.error = value.error;
          this.errors = [];
        }
      },
      error: err => {
        this.errors = err.error.errors;
        this.error = '';
        //console.log('err', err.error.errors)
    }
    });
  }


  // test2(){
  //   this.apiService.test2();
  // }
  //
  // wyloguj(){
  //   this.apiService.wyloguj();
  // }
}
