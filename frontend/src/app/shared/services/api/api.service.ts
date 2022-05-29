import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {finalize} from "rxjs";
import {emitDistinctChangesOnlyDefaultValue} from "@angular/compiler";
import {UserRegistration} from "../../models/user-registration";
import {Filter} from "../../models/filter";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  BASE_API_URL:string = 'http://localhost:8000';

  constructor(private http: HttpClient) { }
  register(registerData: FormData){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post<any>(`${this.BASE_API_URL}/register`,
        registerData
      ,
        {withCredentials: true,headers: headers},
      );
  }

  csrf(){
    return this.http.get(`${this.BASE_API_URL}/sanctum/csrf-cookie`, {withCredentials: true});
  }

  login(email: string, password: string){
    return this.http.post<any>(`${this.BASE_API_URL}/login`, {
      email: email,
      password: password
    }, {withCredentials: true});
  }

  logout(){
    return this.http.post<any>(`${this.BASE_API_URL}/logout`,{}, {withCredentials: true, observe: 'response'});
  }

  getOffers(page: number, filters:Filter[], parameterFilters?:Filter[], parameterIn?:Filter[], parameterValueIn?:Filter[]){
    return this.http.post(`${this.BASE_API_URL}/api/offers?page=${page}`,
      {filters: filters,
        parameterFilters: parameterFilters,
        parameterIn: parameterIn,
        parameterValueIn: parameterValueIn}, {withCredentials: true});
  }

  getPropertyTypes(){
    return this.http.get(`${this.BASE_API_URL}/api/getPropertyType`);
  }

  getOfferTypes(){
    return this.http.get(`${this.BASE_API_URL}/api/getOfferType`);
  }

  getPropertyAndOfferTypes(){
    return this.http.get(`${this.BASE_API_URL}/api/getPropertyAndOfferTypes`);
  }

  getParametersForPropertyType(propertyType: number){
    return this.http.post(`${this.BASE_API_URL}/api/getParameters`, {property_type_id: propertyType});
  }

  getOffer(offerId: number){
    return this.http.post(`${this.BASE_API_URL}/api/getOffer`, {id: offerId});
  }
}
