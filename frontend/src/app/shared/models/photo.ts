export interface Photo {
  id: number;
  path: string;
  description: string;
  created_at: string;
  updated_at: string;
  pivot: { offer_id: number; photo_id: number; isMain: number };
}
