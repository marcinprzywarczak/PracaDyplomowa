export interface UserRegistration {
  isFirmAccount: boolean;
  email: string;
  first_name: string;
  sure_name: string;
  phone_number: string;
  password: string;
  password_confirmation: string;
  firm_name?: string;
  nip?: string;
  regon?: string;
  street?: string;
  number?: string;
  locality?: string;
  zip_code?: string;
  user_avatar?: File;
}
