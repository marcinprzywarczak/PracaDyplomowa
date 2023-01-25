import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validator,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../shared/services/login/login.service';
import { Router } from '@angular/router';
import { UserRegistration } from '../../shared/models/user-registration';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OfferService } from '../../shared/services/offer/offer.service';
import { AlertService } from '../../shared/services/alert-service/alert.service';
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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  isFirmAccount: boolean = false;
  userAvatar: File;
  firmLogo: File;
  isSubmitted: boolean = false;
  userAvatarSrc: string | ArrayBuffer | null = '';
  firmLogoSrc: string | ArrayBuffer | null = '';
  serverErrors: any = [];
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private http: HttpClient,
    private apiService: OfferService,
    private alertService: AlertService
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
            Validators.pattern(/^(\+\d{2}|0) (\d{3} \d{3} \d{3})$/),
          ],
        ],
        sure_name: ['', [Validators.required]],
        firm_name: ['', []],
        nip: ['', []],
        regon: ['', []],
        street: [],
        number: [],
        locality: [],
        zip_code: [],
        isFirmAccount: [this.isFirmAccount],
        user_avatar: [],
        firm_logo: [],
      },
      { validators: confirmedValidator }
    );
  }
  get f() {
    return this.form.controls;
  }
  onSubmit() {
    this.isSubmitted = true;
    if (!this.form.invalid) {
      const formData = new FormData();
      if (this.userAvatarSrc !== '')
        formData.append('user_avatar', this.userAvatar, this.userAvatar.name);
      if (this.firmLogo)
        formData.append('firm_logo', this.firmLogo, this.firmLogo.name);

      formData.append(
        'isFirmAccount',
        this.form.controls['isFirmAccount'].value
      );
      formData.append(
        'email',
        this.form.controls['email'].value != null
          ? this.form.controls['email'].value
          : ''
      );
      formData.append(
        'first_name',
        this.form.controls['first_name'].value != null
          ? this.form.controls['first_name'].value
          : ''
      );
      formData.append(
        'sure_name',
        this.form.controls['sure_name'].value != null
          ? this.form.controls['sure_name'].value
          : ''
      );
      formData.append(
        'phone_number',
        this.form.controls['phone_number'].value != null
          ? this.form.controls['phone_number'].value
          : ''
      );
      formData.append(
        'password',
        this.form.controls['password'].value != null
          ? this.form.controls['password'].value
          : ''
      );
      formData.append(
        'password_confirmation',
        this.form.controls['password_conf'].value != null
          ? this.form.controls['password_conf'].value
          : ''
      );
      formData.append(
        'firm_name',
        this.form.controls['firm_name'].value != null
          ? this.form.controls['firm_name'].value
          : ''
      );
      formData.append(
        'nip',
        this.form.controls['nip'].value != null
          ? this.form.controls['nip'].value
          : ''
      );
      formData.append(
        'regon',
        this.form.controls['regon'].value != null
          ? this.form.controls['regon'].value
          : ''
      );
      formData.append(
        'street',
        this.form.controls['street'].value != null
          ? this.form.controls['street'].value
          : ''
      );
      formData.append(
        'number',
        this.form.controls['number'].value != null
          ? this.form.controls['number'].value
          : ''
      );
      formData.append(
        'locality',
        this.form.controls['locality'].value != null
          ? this.form.controls['locality'].value
          : ''
      );
      formData.append(
        'zip_code',
        this.form.controls['zip_code'].value != null
          ? this.form.controls['zip_code'].value
          : ''
      );

      this.loginService.csrf().subscribe(() => {
        this.loginService.register(formData).subscribe({
          next: (value) => {
            if (value.success) {
              localStorage.setItem('isLogged', 'true');
              localStorage.setItem('user', JSON.stringify(value.user));
              window.location.href = '/dashboard';
            }
          },
          error: (err) => {
            if (err.status === 422) {
              //nie przeszło walidacji po stronie serwera
              if (err.error.errors) this.serverErrors = err.error.errors;
            } else {
              //wyświetlić toast z informacją o błędzie serwera
              this.alertService.showError('Błąd serwera podczas rejestracji.');
            }
          },
        });
      });
    }
  }

  checkValue(event: any) {
    if (event.checked) {
      this.setFirmValidators();
    } else {
      this.clearFirmValidators();
      this.f['firm_name'].clearValidators();
      this.f['firm_name'].updateValueAndValidity();
    }
    this.isFirmAccount = event.checked;
  }
  setFirmValidators() {
    this.f['firm_name'].setValidators([Validators.required]);
    this.f['nip'].setValidators([
      Validators.required,
      Validators.pattern(/^(\d{10})$/),
    ]);
    this.f['regon'].setValidators([
      Validators.required,
      Validators.pattern(/^(\d{9})$/),
    ]);
    this.f['number'].setValidators([Validators.required]);
    this.f['locality'].setValidators([Validators.required]);
    this.f['zip_code'].setValidators([
      Validators.required,
      Validators.pattern(/^(\d){2}-(\d){3}$/),
    ]);
  }
  clearFirmValidators() {
    this.f['firm_name'].clearValidators();
    this.f['firm_name'].updateValueAndValidity();
    this.f['nip'].clearValidators();
    this.f['nip'].updateValueAndValidity();
    this.f['regon'].clearValidators();
    this.f['regon'].updateValueAndValidity();
    this.f['number'].clearValidators();
    this.f['number'].updateValueAndValidity();
    this.f['locality'].clearValidators();
    this.f['locality'].updateValueAndValidity();
    this.f['zip_code'].clearValidators();
    this.f['zip_code'].updateValueAndValidity();
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
    this.f['user_avatar'].patchValue('');
  }

  onChangeFirmLogo(event: any) {
    this.firmLogo = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => (this.firmLogoSrc = reader.result);
    reader.readAsDataURL(this.firmLogo);
  }

  deleteFirmLogo() {
    this.firmLogoSrc = '';
    this.firmLogo = null as any;
    this.f['firm_logo'].patchValue('');
  }
}
