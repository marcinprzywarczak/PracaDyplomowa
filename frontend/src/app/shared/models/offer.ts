import { User } from './user';
import { OfferStatus } from './offer-status';
import { OfferType } from './offer-type';
import { PropertyType } from './property-type';
import { Photo } from './photo';
import { Parameter } from './parameter';

export interface Offer {
  area_square_meters: number;
  created_at: string;
  deleted_at: string;
  description: string;
  id: number;
  locality: string;
  offer_status: OfferStatus;
  offer_status_id: number;
  offer_type: OfferType;
  offer_type_id: number;
  parameters: Parameter[];
  photos: Photo[];
  price: number;
  property_type: PropertyType;
  property_type_id: number;
  title: string;
  updated_at: string;
  user_id: number;
  user: User;
}
