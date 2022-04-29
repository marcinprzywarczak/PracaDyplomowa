import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../shared/services/login/login.service";
import {Router} from "@angular/router";
import {UserRegistration} from "../../shared/models/user-registration";
import {HttpClient, HttpHeaders} from "@angular/common/http";

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
  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [],
      first_name: [],
      password: [],
      password_conf: [],
      phone_number: [],
      sure_name: [],
      firm_name: [],
      nip: [],
      regon: [],
      street: [],
      number: [],
      locality: [],
      zip_code: [],
      isFirmAccount: [this.isFirmAccount],
      user_avatar: [],
      firm_logo: [],
    })
  }
  onSubmit(){
    const formData = new FormData();
    if (this.userAvatar)
      formData.append('user_avatar', this.userAvatar, this.userAvatar.name);
    if(this.firmLogo)
      formData.append('firm_logo', this.firmLogo, this.firmLogo.name);
    formData.append('isFirmAccount',this.form.controls['isFirmAccount'].value);
    formData.append('email',this.form.controls['email'].value);
    formData.append('first_name',this.form.controls['first_name'].value);
    formData.append('sure_name',this.form.controls['sure_name'].value);
    formData.append('phone_number',this.form.controls['phone_number'].value);
    formData.append('password',this.form.controls['password'].value);
    formData.append('password_confirmation',this.form.controls['password_conf'].value);
    formData.append('firm_name',this.form.controls['firm_name'].value);
    formData.append('nip',this.form.controls['nip'].value);
    formData.append('regon',this.form.controls['regon'].value);
    formData.append('street',this.form.controls['street'].value);
    formData.append('number',this.form.controls['number'].value);
    formData.append('locality',this.form.controls['locality'].value);
    formData.append('zip_code',this.form.controls['zip_code'].value);

    // this.http.get('http://localhost:8000/sanctum/csrf-cookie', {withCredentials: true}).subscribe(() =>{
    //   this.http.post('http://localhost:8000/api/photo',formData, {withCredentials:true}).
    //   subscribe(res =>{
    //     console.log(res);
    //   })
    // })

    // if(this.form.controls['isLogged']){
    //   registerData = {
    //     isFirmAccount: this.form.controls['isFirmAccount'].value,
    //     email: this.form.controls['email'].value,
    //     first_name: this.form.controls['first_name'].value,
    //     sure_name: this.form.controls['sure_name'].value,
    //     phone_number: this.form.controls['phone_number'].value,
    //     password: this.form.controls['password'].value,
    //     password_confirmation: this.form.controls['password_conf'].value,
    //     user_avatar: this.userAvatar,
    //   }
    // }
    // else{
    //   registerData = {
    //     isFirmAccount: this.form.controls['isFirmAccount'].value,
    //     email: this.form.controls['email'].value,
    //     first_name: this.form.controls['first_name'].value,
    //     sure_name: this.form.controls['sure_name'].value,
    //     phone_number: this.form.controls['phone_number'].value,
    //     password: this.form.controls['password'].value,
    //     password_confirmation: this.form.controls['password_conf'].value,
    //     user_avatar: this.userAvatar,
    //     firm_name: this.form.controls['firm_name'].value,
    //     nip: this.form.controls['nip'].value,
    //     regon: this.form.controls['regon'].value,
    //     street: this.form.controls['street'].value,
    //     number: this.form.controls['number'].value,
    //     locality: this.form.controls['locality'].value,
    //     zip_code: this.form.controls['zip_code'].value,
    //   }
    // }

    this.loginService.csrf().subscribe(()=>{
      this.loginService.register(
        formData
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

  checkValue(event: any){
    console.log(event);
    this.isFirmAccount = event;
  }

  onChangeUserAvatar(event:any){
    this.userAvatar = event.target.files[0];
  }

  onChangeFirmLogo(event: any){
    this.firmLogo = event.target.files[0];
  }
}
