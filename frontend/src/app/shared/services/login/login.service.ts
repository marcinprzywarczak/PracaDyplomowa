import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { finalize } from 'rxjs';
import { error } from '@angular/compiler/src/util';
import { OfferService } from '../offer/offer.service';
import { UserRegistration } from '../../models/user-registration';
import { environment } from '../../../../environments/environment';

const BASE_API_URL: string = environment.apiUrl;
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  csrf() {
    return this.http.get(`${BASE_API_URL}/sanctum/csrf-cookie`, {
      withCredentials: true,
    });
  }

  login(email: string, password: string) {
    return this.http.post<any>(
      `${BASE_API_URL}/login`,
      {
        email: email,
        password: password,
      },
      { withCredentials: true }
    );
  }

  logout() {
    return this.http.post<any>(
      `${BASE_API_URL}/logout`,
      {},
      { withCredentials: true, observe: 'response' }
    );
  }

  register(registerData: FormData) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post<any>(`${BASE_API_URL}/register`, registerData, {
      withCredentials: true,
      headers: headers,
    });
  }

  getUserPermissions() {
    return this.http.get<any>(`${BASE_API_URL}/api/users/getPermissions`, {
      withCredentials: true,
    });
  }
}
