import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserSettingsService {
  BASE_API_URL: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  editUser(userData: FormData) {
    return this.http.post<any>(
      `${this.BASE_API_URL}/api/users/updateUser`,
      userData,
      {
        withCredentials: true,
      }
    );
  }

  editFirm(firmData: FormData) {
    return this.http.post<any>(
      `${this.BASE_API_URL}/api/users/updateFirm`,
      firmData,
      { withCredentials: true }
    );
  }

  changePassword(data: any) {
    return this.http.put(`${this.BASE_API_URL}/user/password`, data, {
      withCredentials: true,
    });
  }
}
