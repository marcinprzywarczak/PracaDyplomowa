import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../services/api/api.service';
import { ReloadDataTriggerService } from '../../services/reload-data-trigger/reload-data-trigger.service';
import { FirmUserService } from '../../services/firm-user-service/firm-user.service';
import { AlertService } from '../../services/alert-service/alert.service';
import { HideSidebarTriggerService } from '../../services/hide-sidebar-trigger/hide-sidebar-trigger.service';
import { User } from '../../models/user';
import { environment } from '../../../../environments/environment';

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
  BASE_API_URL: string = environment.apiUrl;
  @Input() edit: boolean;
  @Input() user: User;
  @Input() userSetting: boolean;
  form: FormGroup;
  userAvatar: File;
  isSubmitted: boolean = false;
  serverErrors: any = [];
  userAvatarSrc: string | ArrayBuffer | null = '';
  loading: boolean = false;
  photoChanged: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private reloadDataTrigger: ReloadDataTriggerService,
    private firmUserService: FirmUserService,
    private alertService: AlertService,
    private hideSidebarTrigger: HideSidebarTriggerService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        email: [
          this.edit ? this.user.email : null,
          [Validators.required, Validators.email],
        ],
        first_name: [
          this.edit ? this.user.first_name : null,
          [Validators.required],
        ],
        password: [
          '',
          this.edit ? [] : [Validators.required, Validators.minLength(8)],
        ],
        password_conf: ['', this.edit ? [] : [Validators.required]],
        phone_number: [
          this.edit ? this.user.phone_number : null,
          [
            Validators.required,
            // Validators.pattern(/^(?:\(?\?)?(?:[-\s]*(\d)){9}\)?$/),
          ],
        ],
        sure_name: [
          this.edit ? this.user.sure_name : null,
          [Validators.required],
        ],
        user_avatar: [],
      },
      { validators: confirmedValidator }
    );
    if (this.edit) this.setPhoto();
  }
  get f() {
    return this.form.controls;
  }
  onSubmit() {
    if (this.form.invalid) return;

    const formData = new FormData();
    if (this.userAvatarSrc !== '') {
      formData.append('user_avatar', this.userAvatar, this.userAvatar.name);
    }
    formData.append('email', this.form.controls['email'].value);
    formData.append('first_name', this.form.controls['first_name'].value);
    formData.append('sure_name', this.form.controls['sure_name'].value);
    formData.append('phone_number', this.form.controls['phone_number'].value);
    this.loading = true;
    if (this.edit) {
      formData.append('photo_changed', this.photoChanged ? 'true' : 'false');
      if (this.userSetting) {
        this.editUser(formData);
      } else {
        this.editFirmUser(formData);
      }
    } else {
      formData.append('password', this.form.controls['password'].value);
      formData.append(
        'password_confirmation',
        this.form.controls['password_conf'].value
      );
      this.addNewUser(formData);
    }
  }

  addNewUser(formData: FormData) {
    this.firmUserService.addNewFirmUser(formData).subscribe({
      next: (result) => {
        this.alertService.showSuccess('Użytkownik pomyślnie dodany!');
        this.afterRequestSuccess();
      },
      error: (err) => {
        this.alertService.showError('Błąd podczas dodawania pracownika');
        if (err.error.errors) this.serverErrors = err.error.errors;
        this.loading = false;
      },
    });
  }

  editFirmUser(formData: FormData) {
    this.firmUserService.editFirmUser(formData).subscribe({
      next: (result) => {
        this.alertService.showSuccess('Użytkownik pomyślnie zaktualizowany!');
        this.afterRequestSuccess();
      },
      error: (err) => {
        this.alertService.showError('Błąd podczas aktualizacji pracownika');
        if (err.error.errors) this.serverErrors = err.error.errors;
        this.loading = false;
      },
    });
  }

  editUser(formData: FormData) {
    this.firmUserService.editUser(formData).subscribe({
      next: (result) => {
        this.alertService.showSuccess('Dane pomyślnie zaktualizowane');
        this.afterRequestSuccess();
        this.reloadDataTrigger.triggerUserInfoReload();
      },
      error: (err) => {
        this.alertService.showError('Błąd podczas aktualizacji danych');
        if (err.error.errors) this.serverErrors = err.error.errors;
        this.loading = false;
      },
    });
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
    if (this.edit) this.photoChanged = true;
    this.f['user_avatar'].patchValue('');
    this.form.markAsDirty();
  }

  setPhoto() {
    this.http
      .get(`${this.BASE_API_URL}/api/image/${this.user.avatar}`, {
        responseType: 'blob',
      })
      .subscribe((result) => {
        this.userAvatar = new File([result], 'photo');
      });
    this.userAvatarSrc = this.user.avatar_url;
  }

  afterRequestSuccess() {
    this.reloadDataTrigger.triggerFirmUsersReload();
    this.hideSidebarTrigger.triggerAddFirmUserSidebarHide();
    this.form.reset();
    this.userAvatarSrc = '';
    this.userAvatar = null as any;
    this.loading = false;
  }
}
