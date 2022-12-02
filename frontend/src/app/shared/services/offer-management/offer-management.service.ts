import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OfferManagementService {
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

  getUserOffer(page: number, status: string) {
    return this.http.post<any>(
      `${this.BASE_API_URL}/api/offers/userOffer?page=${page}`,
      { status: status },
      {
        withCredentials: true,
      }
    );
  }

  addOfferToFollowing(offerId: number) {
    return this.http.post<any>(
      `${this.BASE_API_URL}/api/offers/addOfferToFollowing`,
      { offerId: offerId },
      {
        withCredentials: true,
      }
    );
  }

  removeOfferFromFollowing(offerId: number) {
    return this.http.post<any>(
      `${this.BASE_API_URL}/api/offers/removeOfferFromFollowing`,
      { offerId: offerId },
      {
        withCredentials: true,
      }
    );
  }

  getFollowingOffers(page: number) {
    return this.http.post<any>(
      `${this.BASE_API_URL}/api/offers/getFollowingOffers?page=${page}`,
      {},
      { withCredentials: true }
    );
  }

  completeOffer(offerId: number) {
    return this.http.post<any>(
      `${this.BASE_API_URL}/api/offers/completeOffer`,
      { offerId: offerId },
      {
        withCredentials: true,
      }
    );
  }

  restoreOffer(offerId: number) {
    return this.http.post<any>(
      `${this.BASE_API_URL}/api/offers/restoreOffer`,
      { offerId: offerId },
      {
        withCredentials: true,
      }
    );
  }
}
