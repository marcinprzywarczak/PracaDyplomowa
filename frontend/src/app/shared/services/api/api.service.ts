import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { finalize } from 'rxjs';
import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler';
import { UserRegistration } from '../../models/user-registration';
import { Filter } from '../../models/filter';
import { environment } from '../../../../environments/environment';
import { Offer } from '../../models/offer';
import { ParameterCategory } from '../../models/parameter-category';
import { OffersPaginate } from '../../models/offers-paginate';
import { PropertyType } from '../../models/property-type';
import { OfferType } from '../../models/offer-type';
import { PropertyParameter } from '../../models/property-parameter';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  BASE_API_URL: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getOffers(
    page: number,
    filters: Filter[],
    parameterFilters?: Filter[],
    parameterIn?: Filter[],
    parameterValueIn?: Filter[]
  ) {
    return this.http.post<{ offers: OffersPaginate }>(
      `${this.BASE_API_URL}/api/offers?page=${page}`,
      {
        filters: filters,
        parameterFilters: parameterFilters,
        parameterIn: parameterIn,
        parameterValueIn: parameterValueIn,
      },
      { withCredentials: true }
    );
  }

  getPropertyTypes() {
    return this.http.get<PropertyType[]>(
      `${this.BASE_API_URL}/api/getPropertyType`
    );
  }

  getOfferTypes() {
    return this.http.get<OfferType[]>(`${this.BASE_API_URL}/api/getOfferType`);
  }

  getPropertyAndOfferTypes() {
    return this.http.get<{
      offerTypes: OfferType[];
      propertyTypes: PropertyType[];
    }>(`${this.BASE_API_URL}/api/getPropertyAndOfferTypes`);
  }

  getParametersForPropertyType(propertyType: number) {
    return this.http.post<PropertyParameter[]>(
      `${this.BASE_API_URL}/api/getParameters`,
      {
        property_type_id: propertyType,
      }
    );
  }

  getOffer(offerId: number) {
    return this.http.post<{
      offer: Offer;
      parameterCategories: ParameterCategory;
    }>(`${this.BASE_API_URL}/api/getOffer`, { id: offerId });
  }

  getOfferEdit(offerId: number) {
    return this.http.post<{
      offer: Offer;
      parameterCategories: ParameterCategory;
    }>(
      `${this.BASE_API_URL}/api/offers/getOfferToEdit`,
      { id: offerId },
      { withCredentials: true }
    );
  }
}
