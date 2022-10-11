import { Offer } from './offer';
import { User } from './user';
import { Message } from './message';

export interface MessageHeader {
  id: number;
  offer: Offer;
  offer_id: number;
  recipient: number;
  sender: number;
  recipient_user: User;
  sender_user: User;
  subject: string;
  unread_sender_messages: number;
  unread_recipient_messages: number;
  created_at: string;
  updated_at: string;
}
