import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {finalize} from "rxjs";
import {emitDistinctChangesOnlyDefaultValue} from "@angular/compiler";
import {UserRegistration} from "../models/user-registration";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  register(registerData: FormData){
    console.log(registerData);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post<any>('http://localhost:8000/register',

        // isFirmAccount: registerData.isFirmAccount,
        // email: registerData.email,
        // first_name: registerData.first_name,
        // sure_name: registerData.sure_name,
        // phone_number: registerData.phone_number,
        // password: registerData.password,
        // password_confirmation: registerData.password_confirmation,
        // firm_name: registerData.firm_name,
        // nip: registerData.nip,
        // regon: registerData.regon,
        // street: registerData.street,
        // number: registerData.number,
        // locality: registerData.locality,
        // zip_code: registerData.zip_code,
        // file: registerData.user_avatar,
        registerData
      ,
        {withCredentials: true,headers: headers},
      )
      ;
  }
  test(){
    // this.http.get('http://localhost:8000/sanctum/csrf-cookie').pipe(finalize(() => {
    //   this.http.post('http://localhost:8000/log',
    //   {email: 'test@test.com', password: '12345678'}).subscribe(value => {
    //   console.log(value)})})).subscribe(()=>{
    //   this.http.post('http://localhost:8000/log',
    //     {email: 'test@test.com', password: '12345678'}).subscribe(value => {
    //     console.log(value)})});

    this.http.get('http://localhost:8000/sanctum/csrf-cookie', {withCredentials: true}).subscribe(()=>{
      this.http.post('http://localhost:8000/login',
        {email: 'test@test.com', password: '12345678'}, {withCredentials: true}).subscribe(val=>{
        console.log(val);
      });
    });

    // this.http.post('http://localhost:8000/api/register',
    //   {name: 'test', email: 'test@test.com', password: '12345678', password_confirmation:'12345678'}).subscribe(()=>{
    //   console.log('test');
    // });
    //

    // this.http.post('http://localhost:8000/login',
    //     {email: 'test@test.com', password: '12345678'}).subscribe(()=>{
    //     console.log('test');
    //   });

  }

  test2(){
    this.http.get('http://localhost:8000/api/user', {withCredentials: true}).subscribe(val=>{
      console.log(val)});
  }

  wyloguj(){
    this.http.get('http://localhost:8000/sanctum/csrf-cookie', {withCredentials: true}).subscribe(()=>{
      this.http.post('http://localhost:8000/logout',{}, {withCredentials: true}).subscribe();
    });
  }
}
