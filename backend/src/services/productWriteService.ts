import { products_gender, products_type } from "@prisma/client";
import { prisma } from "../database/prisma";
import { ProductCreateDTO, VariantDTO, SkuDTO } from "../models/DTOs/productsWrite.dto";

// POST /products
export const createProduct = async (data: ProductCreateDTO) => {
  const genderEnum = data.gender as products_gender;
  const typeEnum = data.type as products_type;

 return prisma.products.create({
  data: {
    name: data.name,
    reference: data.reference,
    type: typeEnum,
    gender: genderEnum,
    prompt_delivery: data.prompt_delivery,
    description: data.description,
    companies: { connect: { id: data.company_id } },
    brands: { connect: { id: data.brand_id } },
    categories: { connect: { id: data.category_id } },
    subcategories: data.subcategory_id ? { connect: { id: data.subcategory_id } } : undefined,
    variants: data.variants
      ? {
          create: data.variants.map((variant) => ({
            name: variant.name,
            hex_code: variant.hex_code,
            skus: {
              create: variant.skus.map((sku) => ({
                size: sku.size,
                price: sku.price,
                stock: sku.stock,
                min_quantity: sku.min_quantity ?? 1,
                multiple_quantity: sku.multiple_quantity,
                code: sku.code ?? "",
              })),
            },
          })),
        }
      : undefined,
  },
});
};

// PUT /products/:id
export const updateProduct = async (id: number, data: Partial<ProductCreateDTO>) => {
  return prisma.products.update({
    where: { id },
    data: {
      name: data.name,
      reference: data.reference,
      description: data.description,
      gender: data.gender ? (data.gender as products_gender) : undefined,
      type: data.type ? (data.type as products_type) : undefined,
      prompt_delivery: data.prompt_delivery,
      company_id: data.company_id,
      brand_id: data.brand_id,
      category_id: data.category_id,
      subcategory_id: data.subcategory_id,
      erp_id: data.erp_id,
      deadline_id: data.deadline_id,
      category_order: data.category_order,
      composition_data: data.composition_data,
      technical_information: data.technical_information,
      open_grid: data.open_grid,
      ipi: data.ipi,
      is_discontinued: data.is_discontinued,
      is_launch: data.is_launch,
      is_visible: data.is_visible,
      colection: data.colection,
      st: data.st,
      variants: data.variants
        ? {
            // substitui todas as variantes e SKUs
            deleteMany: {},
            create: data.variants.map((variant: VariantDTO) => ({
              name: variant.name,
              hex_code: variant.hex_code,
              skus: {
                create: variant.skus.map((sku: SkuDTO) => ({
                  size: sku.size,
                  price: sku.price,
                  stock: sku.stock,
                  min_quantity: sku.min_quantity ?? 1,
                  multiple_quantity: sku.multiple_quantity,
                  code: sku.code ?? "",
                })),
              },
            })),
          }
        : undefined,
    },
  });
};

// DELETE /products/:id (soft delete)
export const deleteProduct = async (id: number) => {
  return prisma.products.update({
    where: { id },
    data: { deleted_at: new Date() },
  });
};