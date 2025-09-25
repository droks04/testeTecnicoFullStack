export type SkuDTO = {
  size: string;
  price: number;
  stock: number;
  min_quantity?: number;
  multiple_quantity: number;
  code?: string;
};

export type VariantDTO = {
  name: string;
  hex_code?: string;
  skus: SkuDTO[];
};

export type ProductCreateDTO = {
  name: string;
  reference: string;
  type: string; 
  gender: string; 
  prompt_delivery: boolean;
  description?: string;
  company_id: number;
  erp_id?: string;
  brand_id: number;
  deadline_id?: number;
  category_id: number;
  subcategory_id?: number;
  category_order?: number;
  composition_data?: string;
  technical_information?: string;
  open_grid?: boolean;
  ipi?: number;
  is_discontinued?: boolean;
  is_launch?: boolean;
  is_visible?: boolean;
  colection?: string;
  st?: number;
  variants?: VariantDTO[];
};
