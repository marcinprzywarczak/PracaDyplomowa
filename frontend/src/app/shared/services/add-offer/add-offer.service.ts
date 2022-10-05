import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AddOfferService {
  BASE_API_URL: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  addOffer(offerData: FormData) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post<any>(
      `${this.BASE_API_URL}/api/offers/store`,
      offerData,
      {
        withCredentials: true,
        headers: headers,
      }
    );
  }

  editOffer(offerData: FormData) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post<any>(
      `${this.BASE_API_URL}/api/offers/update`,
      offerData,
      {
        withCredentials: true,
        headers: headers,
      }
    );
  }
}
