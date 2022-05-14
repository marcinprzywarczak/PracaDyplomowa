import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {finalize} from "rxjs";
import {emitDistinctChangesOnlyDefaultValue} from "@angular/compiler";
import {UserRegistration} from "../../models/user-registration";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  register(registerData: FormData){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post<any>('http://localhost:8000/register',
        registerData
      ,
        {withCredentials: true,headers: headers},
      );
  }

  csrf(){
    return this.http.get('http://localhost:8000/sanctum/csrf-cookie', {withCredentials: true});
  }

  login(email: string, password: string){
    return this.http.post<any>('http://localhost:8000/login', {
      email: email,
      password: password
    }, {withCredentials: true});
  }

  logout(){
    return this.http.post<any>('http://localhost:8000/logout',{}, {withCredentials: true, observe: 'response'});
  }

  getOffers(page: number){
    return this.http.get(`http://localhost:8000/api/offers?page=${page}`, {withCredentials: true});
  }
}
