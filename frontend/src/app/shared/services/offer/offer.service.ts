import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Filter } from '../../models/filter';
import { OffersPaginate } from '../../models/offers-paginate';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  BASE_API_URL: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

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
