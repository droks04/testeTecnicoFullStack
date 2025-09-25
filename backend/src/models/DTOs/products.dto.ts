export type ProductImageDTO = {
  id: number;
  url: string;
};

export type PriceTableSkuDTO = {
  price_table_id: number;
};

export type SkuDTO = {
  id: number;
  size: string;
  price: number;
  multiple_quantity: number;
  price_tables_skus: PriceTableSkuDTO[];
};

export type VariantDTO = {
  id: number;
  name: string;
  skus: SkuDTO[];
};

export type BrandDTO = {
  id: number;
  name: string;
};

export type CategoryDTO = {
  id: number;
  name: string;
};

export type ProductDTO = {
  id: number;
  name: string;
  reference: string;
  description: string;
  brands: BrandDTO;
  categories: CategoryDTO;
  variants: VariantDTO[];
  images: string[];
};
