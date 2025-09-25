export type BrandFilterDTO = {
  id: number;
  name: string | null;
  quantity: number;
};

export type TypeFilterDTO = {
  name: string | null;
  quantity: number;
};

export type GenderFilterDTO = {
  name: string | null;
  quantity: number;
};

export type SubcategoryDTO = {
  name: string | null;
  quantity: number;
};

export type CategoryFilterDTO = {
  name: string | null;
  quantity: number;
  subcategories: SubcategoryDTO[];
};

export type PromptDeliveryDTO = Record<string, number>;

export type ProductFiltersDTO = {
  brands: BrandFilterDTO[];
  types: TypeFilterDTO[];
  genders: GenderFilterDTO[];
  categories: CategoryFilterDTO[];
  promptDelivery: PromptDeliveryDTO;
};
