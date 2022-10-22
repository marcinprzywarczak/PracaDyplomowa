import { AfterContentInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/services/api/api.service';
import { LoginService } from '../../shared/services/login/login.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RouteService } from '../../shared/services/route/route.service';
import { CookieService } from 'ngx-cookie-service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  errors: any = [];
  error: any;
  isSubmitted: boolean = false;
  loading: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private apiService: ApiService,
    private location: Location,
    private routeService: RouteService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get f() {
    return this.form.controls;
  }
  onSubmit() {
    this.isSubmitted = true;
    this.loading = true;
    if (!this.form.invalid) {
      this.loginService.csrf().subscribe(() => {
        this.loginService
          .login(
            this.form.controls['email'].value,
            this.form.controls['password'].value
          )
          .subscribe({
            next: (value) => {
              this.loading = false;
              if (value.error) {
                this.error = value.error;
                this.errors = [];
              } else {
                localStorage.setItem('isLogged', 'true');
                localStorage.setItem('user', JSON.stringify(value.user));
                if (
                  this.routeService.getPreviousUrl() !== '/login' &&
                  this.routeService.getPreviousUrl() !== '/'
                )
                  window.location.href = this.routeService.getPreviousUrl();
                else {
                  window.location.reload();
                }
              }
            },
            error: (err) => {
              this.loading = false;
              this.errors = err.error.errors;
              this.error = '';
              //console.log('err', err.error.errors)
            },
          });
      });
    }
  }
}
