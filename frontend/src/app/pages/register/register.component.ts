import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {LoginService} from "../../shared/services/login/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [],
      name: [],
      password: [],
      password_conf: [],
    })
  }
  onSubmit(){

    this.loginService.csrf().subscribe(()=>{
      this.loginService.register(
        this.form.controls['email'].value,
        this.form.controls['name'].value,
        this.form.controls['password'].value,
        this.form.controls['password_conf'].value,
      ).subscribe({
        next: value => {
          if(value.success){
            this.router.navigate(['/dashboard']);
            localStorage.setItem('isLogged', 'true');
          }
        },
          error: err => {
            console.log('err', err.error.errors)
        }
      });
    });
    //console.log(this.form.controls['email'].value,this.form.controls['name'].value,this.form.controls['password'].value);
  }
}
