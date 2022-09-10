import { ParameterCategory } from './parameter-category';
import { PropertyType } from './property-type';
import { ParameterValue } from './parameter-value';

export interface PropertyParameter {
  id: number;
  name: string;
  is_any: number;
  parameter_category: ParameterCategory;
  parameter_category_id: number;
  property_type_id: number;
  property_type: PropertyType;
  type: string;
  parameter_values: ParameterValue[];
  created_at: string;
  updated_at: string;
}
