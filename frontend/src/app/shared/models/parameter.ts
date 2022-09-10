export interface Parameter {
  id: number;
  name: string;
  is_any: number;
  parameter_category_id: number;
  property_type_id: number;
  type: string;
  pivot: { offer_id: number; parameter_id: number; value: string };
  created_at: string;
  updated_at: string;
}
