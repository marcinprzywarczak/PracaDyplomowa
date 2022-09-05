import { Firm } from './firm';

export interface User {
  id: number;
  first_name: string;
  sure_name: string;
  email: string;
  phone_number: string;
  avatar: string;
  firm_id: number;
  firm: Firm;
  permissions: any[];
  roles: any[];
  created_at: Date;
  updated_at: Date;
}
