import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LazyLoadEvent } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class FirmUserService {
  BASE_API_URL: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getFirmUsers(event: LazyLoadEvent) {
    console.log(JSON.stringify(event));
    return this.http.post<any>(
      `${this.BASE_API_URL}/api/users/getUsers`,
      { filters: event },
      {
        withCredentials: true,
      }
    );
  }
}
