import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validator, ValidatorFn, Validators} from "@angular/forms";
import {LoginService} from "../../shared/services/login/login.service";
import {Router} from "@angular/router";
import {UserRegistration} from "../../shared/models/user-registration";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiService} from "../../shared/services/api/api.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  isFirmAccount: boolean = false;
  userAvatar: File;
  firmLogo: File;
  isSubmitted: boolean = false;
  // emailErrors: any = [];
  // firmNameErrors: any = [];
  // firstNameErrors: any = [];
  // localityErrors: any = [];
  // nipErrors: any = [];
  // numberErrors: any = [];
  // passwordErrors: any = [];
  // phoneNumberErrors: any = [];
  // regonErrors: any = [];
  // sureNameErrors: any = [];
  // zipCodeErrors: any = [];

  serverErrors: any = [];
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private http: HttpClient,
    private apiService: ApiService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      first_name: ['', [Validators.required]],
      password:  ['', [Validators.required, Validators.minLength(8)]],
      password_conf:  ['', [Validators.required]],
      phone_number:  ['', [Validators.required, Validators.pattern(/^(?:\(?\?)?(?:[-\s]*(\d)){9}\)?$/)]],
      sure_name: ['', [Validators.required]],
      firm_name:['', []],
      nip: ['', []],
      regon: ['', []],
      street: [],
      number: [],
      locality: [],
      zip_code: [],
      isFirmAccount: [this.isFirmAccount],
      user_avatar: [],
      firm_logo: [],
    }, {validator: this.confirmedValidator('password', 'password_conf')})
  }
  get f() {
    return this.form.controls;
  }
  onSubmit(){
    this.isSubmitted = true;
    console.log('czy niepoprawne', this.form.invalid);
    if(!this.form.invalid)
    {
      const formData = new FormData();
      if (this.userAvatar)
        formData.append('user_avatar', this.userAvatar, this.userAvatar.name);
      if(this.firmLogo)
        formData.append('firm_logo', this.firmLogo, this.firmLogo.name);

      formData.append('isFirmAccount',this.form.controls['isFirmAccount'].value);
      formData.append('email',this.form.controls['email'].value != null ? this.form.controls['email'].value : '');
      formData.append('first_name',this.form.controls['first_name'].value != null ? this.form.controls['first_name'].value : '');
      formData.append('sure_name',this.form.controls['sure_name'].value != null ? this.form.controls['sure_name'].value : '');
      formData.append('phone_number',this.form.controls['phone_number'].value != null ? this.form.controls['phone_number'].value : '');
      formData.append('password',this.form.controls['password'].value != null ? this.form.controls['password'].value : '');
      formData.append('password_confirmation',this.form.controls['password_conf'].value != null ? this.form.controls['password_conf'].value : '');
      formData.append('firm_name',this.form.controls['firm_name'].value != null ? this.form.controls['firm_name'].value : '');
      formData.append('nip',this.form.controls['nip'].value != null ? this.form.controls['nip'].value : '');
      formData.append('regon',this.form.controls['regon'].value != null ? this.form.controls['regon'].value : '');
      formData.append('street',this.form.controls['street'].value != null ? this.form.controls['street'].value : '');
      formData.append('number',this.form.controls['number'].value != null ? this.form.controls['number'].value : '');
      formData.append('locality',this.form.controls['locality'].value != null ? this.form.controls['locality'].value : '');
      formData.append('zip_code',this.form.controls['zip_code'].value != null ? this.form.controls['zip_code'].value : '');


      this.apiService.csrf().subscribe(()=>{
        this.apiService.register(
          formData
        ).subscribe({
          next: value => {
            if(value.success){
              localStorage.setItem('isLogged', 'true');
              localStorage.setItem('user', JSON.stringify(value.user));
              window.location.href="/dashboard";
            }
          },
          error: err => {
            if(err.status === 422){
              //nie przeszło walidacji po stronie serwera
              console.log(err.error.errors);
              // this.emailErrors = err.error.errors.email;
              // this.firmNameErrors = err.error.errors.firm_name;
              // this.firstNameErrors = err.error.errors.first_name;
              // this.localityErrors = err.error.errors.locality;
              // this.nipErrors = err.error.errors.nip;
              // this.numberErrors = err.error.errors.number;
              // this.passwordErrors = err.error.errors.password;
              // this.phoneNumberErrors = err.error.errors.phone_number;
              // this.regonErrors = err.error.errors.regon;
              // this.sureNameErrors = err.error.errors.sure_name;
              // this.zipCodeErrors = err.error.errors.zip_code;
              this.serverErrors = err.error.errors;
            }
            else{
              //wyświetlić toast z informacją o błędzie serwera
              console.log('err', err)
            }

          }
        });
      });
    }

  }

  checkValue(event: any){
    if (event){
      this.setFirmValidators();
    }
    else
    {
      this.clearFirmValidators();
      this.f['firm_name'].clearValidators();
      this.f['firm_name'].updateValueAndValidity();
    }
    this.isFirmAccount = event;
  }
  setFirmValidators(){
    this.f['firm_name'].setValidators([Validators.required]);
    this.f['nip'].setValidators([Validators.required]);
    this.f['regon'].setValidators([Validators.required]);
    //this.f['street'].setValidators([Validators.required]);
    this.f['number'].setValidators([Validators.required]);
    this.f['locality'].setValidators([Validators.required]);
    this.f['zip_code'].setValidators([Validators.required, Validators.pattern(/^(\d){2}-(\d){3}$/)]);

  }
  clearFirmValidators(){
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

  onChangeUserAvatar(event:any){
    this.userAvatar = event.target.files[0];
  }

  onChangeFirmLogo(event: any){
    this.firmLogo = event.target.files[0];
  }

  checkPasswords: ValidatorFn = (group: any):  ValidationErrors | null => {
    //console.log(group.controls);
    let pass = group.controls['password'].value;
    let confirmPass = group.controls['password_conf'].value
    return pass === confirmPass ? null : { notSame: true }
  }
  confirmedValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
}
