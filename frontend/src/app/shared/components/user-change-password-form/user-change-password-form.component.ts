import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../../services/alert-service/alert.service';
import { HideSidebarTriggerService } from '../../services/hide-sidebar-trigger/hide-sidebar-trigger.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private alertService: AlertService,
    private hideSidebarTrigger: HideSidebarTriggerService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        current_password: [null, [Validators.required]],
        password: [null, [Validators.required]],
        password_confirmation: [null, [Validators.required]],
      },
      { validators: confirmedValidator }
    );
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.loading = true;
    const data = this.form.value;
    this.http
      .put(`${this.BASE_API_URL}/user/password`, data, {
        withCredentials: true,
      })
      .subscribe({
        next: (result) => {
          this.alertService.showSuccess(
            'Hasło zostało zaktualizowane pomyślnie.'
          );
          this.hideSidebarTrigger.triggerAddFirmUserSidebarHide();
          this.form.reset();
          this.loading = false;
        },
        error: (err) => {
          if (err.error.errors) this.serverErrors = err.error.errors;
          this.alertService.showError('Błąd podczas aktualizacji hasła.');
          console.log(err);
          this.loading = false;
        },
      });
  }
}
