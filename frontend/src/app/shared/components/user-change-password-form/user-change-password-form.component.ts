import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

const confirmedValidator = (fg: FormGroup) => {
  const control = fg.get('password');
  const matchingControl = fg.get('password_confirmation');
  if (control?.value !== matchingControl?.value) {
    control?.updateValueAndValidity({ onlySelf: true });
    matchingControl?.updateValueAndValidity({ onlySelf: true });
    return { ['confirmedPassword']: true };
  } else {
    return null;
  }
};
@Component({
  selector: 'app-user-change-password-form',
  templateUrl: './user-change-password-form.component.html',
  styleUrls: ['./user-change-password-form.component.scss'],
})
export class UserChangePasswordFormComponent implements OnInit {
  BASE_API_URL: string = environment.apiUrl;
  form: FormGroup;
  isSubmitted: boolean = false;
  serverErrors: any = [];
  loading: boolean = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        current_password: [],
        password: [],
        password_confirmation: [],
      },
      { validators: confirmedValidator }
    );
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    const data = this.form.value;
    this.http
      .put(`${this.BASE_API_URL}/user/password`, data, {
        withCredentials: true,
      })
      .subscribe({
        next: (result) => {
          console.log(result);
        },
        error: (err) => {
          if (err.error.errors) this.serverErrors = err.error.errors;

          console.log(err);
        },
      });
  }
}
