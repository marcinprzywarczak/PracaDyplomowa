import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {finalize} from "rxjs";
import {error} from "@angular/compiler/src/util";
import {ApiService} from "../api.service";
import {UserRegistration} from "../../models/user-registration";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private apiService: ApiService) { }
  csrf(){
    return this.http.get('http://localhost:8000/sanctum/csrf-cookie', {withCredentials: true});
  }
  login(email: string, password: string){
    //this.http.get('http://localhost:8000/sanctum/csrf-cookie', {withCredentials: true}).subscribe();
    // return this.http.get('http://localhost:8000/sanctum/csrf-cookie', {withCredentials: true}).pipe(()=>{
      return this.http.post<any>('http://localhost:8000/login', {
        email: email,
        password: password
      }, {withCredentials: true});
    // });
  }
  test(){
    return this.http.get<any>('http://localhost:8000/api/user', {withCredentials: true});
  }

  isLogged(){
    return this.http.post<{isLogged: boolean}>('http://localhost:8000/api/isLogged',{}, {withCredentials: true});
  }

  logout(){
    return this.http.post<any>('http://localhost:8000/logout',{}, {withCredentials: true, observe: 'response'});
  }

  register(registerData: FormData){
    return this.apiService.register(registerData);
  }
}
