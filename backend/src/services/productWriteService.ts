import { prisma } from "../database/prisma";

// POST /products
export const createProduct = async (data: any) => {
  return prisma.products.create({
    data: {
      name: data.name,
      reference: data.reference,
      gender: data.gender,
      description: data.description,
      type: data.type,
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

      variants: {
        create: data.variants?.map((variant: any) => ({
          name: variant.name,
          hex_code: variant.hex_code,
          skus: {
            create: variant.skus?.map((sku: any) => ({
              size: sku.size,
              price: parseFloat(sku.price),
              stock: sku.stock,
              min_quantity: sku.min_quantity ?? 1,
              multiple_quantity: sku.multiple_quantity ?? 1,
              code: sku.code ?? "",
            })),
          },
        })),
      },
    },
  });
};

//Metodo PUT
export const updateProduct = async (id: string, data: any) => {
  return prisma.products.update({
    where: { id: Number(id) },
    data,
  });
};

//Delete
export const deleteProduct = async (id: string) => {
  return prisma.products.update({
    where: { id: Number(id) },
    data: { deleted_at: new Date() }
  });
};