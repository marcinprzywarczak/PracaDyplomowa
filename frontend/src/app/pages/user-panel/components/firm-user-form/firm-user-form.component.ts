import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../../../shared/services/login/login.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../../shared/services/api/api.service';
import { ReloadDataTriggerService } from '../../../../shared/services/reload-data-trigger/reload-data-trigger.service';
import { FirmUserService } from '../../../../shared/services/firm-user-service/firm-user.service';
import { AlertService } from '../../../../shared/services/alert-service/alert.service';
import { HideSidebarTriggerService } from '../../../../shared/services/hide-sidebar-trigger/hide-sidebar-trigger.service';

const confirmedValidator = (fg: FormGroup) => {
  const control = fg.get('password');
  const matchingControl = fg.get('password_conf');
  if (control?.value !== matchingControl?.value) {
    control?.updateValueAndValidity({ onlySelf: true });
    matchingControl?.updateValueAndValidity({ onlySelf: true });
    return { ['confirmedPassword']: true };
  } else {
    return null;
  }
};

@Component({
  selector: 'app-firm-user-form',
  templateUrl: './firm-user-form.component.html',
  styleUrls: ['./firm-user-form.component.scss'],
})
export class FirmUserFormComponent implements OnInit {
  form: FormGroup;
  isFirmAccount: boolean = false;
  userAvatar: File;
  firmLogo: File;
  isSubmitted: boolean = false;
  serverErrors: any = [];
  userAvatarSrc: string | ArrayBuffer | null = '';
  loading: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private reloadDataTrigger: ReloadDataTriggerService,
    private firmUserService: FirmUserService,
    private alertService: AlertService,
    private hideSidebarTrigger: HideSidebarTriggerService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        first_name: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        password_conf: ['', [Validators.required]],
        phone_number: [
          '',
          [
            Validators.required,
            Validators.pattern(/^(?:\(?\?)?(?:[-\s]*(\d)){9}\)?$/),
          ],
        ],
        sure_name: ['', [Validators.required]],
        user_avatar: [],
      },
      { validators: confirmedValidator }
    );
  }
  get f() {
    return this.form.controls;
  }
  onSubmit() {
    if (this.form.invalid) return;

    this.loading = true;
    const formData = new FormData();
    if (this.userAvatarSrc !== '') {
      formData.append('user_avatar', this.userAvatar, this.userAvatar.name);
    }

    formData.append('email', this.form.controls['email'].value);
    formData.append('first_name', this.form.controls['first_name'].value);
    formData.append('sure_name', this.form.controls['sure_name'].value);
    formData.append('phone_number', this.form.controls['phone_number'].value);
    formData.append('password', this.form.controls['password'].value);
    formData.append(
      'password_confirmation',
      this.form.controls['password_conf'].value
    );
    this.firmUserService.addNewFirmUser(formData).subscribe({
      next: (result) => {
        this.alertService.showSuccess('Użytkownik pomyślnie dodany!');
        this.reloadDataTrigger.triggerFirmUsersReload();
        this.hideSidebarTrigger.triggerAddFirmUserSidebarHide();
        this.form.reset();
        this.userAvatarSrc = '';
        this.userAvatar = null as any;
        this.loading = false;
      },
      error: (err) => {
        this.alertService.showError('Błąd podczas dodawania pracownika');
        this.serverErrors = err.error.errors;
        this.loading = false;
      },
    });
    console.log(this.form.errors);
    console.log(this.form.errors?.confirmedPassword);
  }

  onChangeUserAvatar(event: any) {
    this.userAvatar = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => (this.userAvatarSrc = reader.result);
    reader.readAsDataURL(this.userAvatar);
  }

  deleteUserAvatar() {
    this.userAvatarSrc = '';
    this.userAvatar = null as any;
    this.f['mainPhoto'].setValue(null);
  }
}
