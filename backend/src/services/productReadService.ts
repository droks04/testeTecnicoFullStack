import { prisma } from "../database/prisma";
import { ProductDTO } from "../models/DTOs/products.dto";

const baseUrl = "http://localhost:3333/";

// GET todos os produtos ativos
export const getProducts = async (): Promise<ProductDTO[]> => {
    const products = await prisma.products.findMany({
    where: { 
      deleted_at: null,
      variants: {
        some: {
          skus: {
            some: {
              price_tables_skus: { some: {} } // garante pelo menos um preço
            }
          }
        }
      }
    },
    select: {
      id: true,
      name: true,
      reference: true,
      description: true,
      brands: { select: { id: true, name: true } },
      categories: { select: { id: true, name: true } },
      variants: {
        select: {
          id: true,
          name: true,
          skus: {
            where: {
              price_tables_skus: { some: {} }
            },
            select: {
              id: true,
              size: true,
              price: true,
              multiple_quantity: true,
              price_tables_skus: { select: { price_table_id: true } },
            },
          },
        },
      },
      product_images: { select: { id: true, url: true } },
    },
  });

   const filteredProducts: ProductDTO[] = products.map((product) => {
    const validVariants = product.variants.filter((variant) => {
      if (!variant.skus.length) return false;

      const priceTableIdsPerSku = variant.skus.map(sku =>
        sku.price_tables_skus.map(pt => pt.price_table_id)
      );

      const firstSkuTables = priceTableIdsPerSku[0] || [];

      return priceTableIdsPerSku.every(ids =>
        ids.length === firstSkuTables.length &&
        ids.every(id => firstSkuTables.includes(id))
      );
    });

    return {
      id: product.id,
      name: product.name,
      reference: product.reference,
      brands: product.brands,
      description: product.description, 
      categories: product.categories,
      variants: validVariants.map(v => ({
        id: v.id,
        name: v.name,
        skus: v.skus.map(sku => ({
          id: sku.id,
          size: sku.size,
          price: Number(sku.price),
          multiple_quantity: sku.multiple_quantity,
          price_tables_skus: sku.price_tables_skus,
        }))
      })),
      images: product.product_images.map((img) => `${baseUrl}${img.url}`),
    };
  });
  return filteredProducts.filter(p => p.variants.length > 0);
};

// GET produto por id (ativo)
export const getProductsId = async (id: number): Promise<ProductDTO | null> => {
  const product = await prisma.products.findFirst({
  where: { id, deleted_at: null },
  select: {
    id: true,
    name: true,
    reference: true,
    description: true,
    categories: { select: { id: true, name: true } },
    brands: { select: { id: true, name: true } },
    variants: {
      select: {
        id: true,
        name: true,
        skus: {
          where: { price_tables_skus: { some: {} } }, // <- ADICIONADO
          select: {
            id: true,
            size: true,
            price: true,
            multiple_quantity: true,
            price_tables_skus: { select: { price_table_id: true } },
          },
        },
      },
    },
    product_images: { select: { id: true, url: true } },
  },
});

  if (!product) return null;

  // Filtra variantes cujos SKUs estão todos na mesma tabela de preço
  const filteredVariants = product.variants.filter((variant) => {
    if (!variant.skus.length) return false;

    const priceTableIdsPerSku = variant.skus.map((sku) =>
      sku.price_tables_skus.map((pt) => pt.price_table_id)
    );

    const firstSkuTables = priceTableIdsPerSku[0] || [];

    return priceTableIdsPerSku.every(
      (ids) =>
        ids.length === firstSkuTables.length &&
        ids.every((id) => firstSkuTables.includes(id))
    );
  });

  const dto: ProductDTO = {
    id: product.id,
    name: product.name,
    reference: product.reference,
    description: product.description ?? "",
    categories: product.categories,
    brands: product.brands,
    variants: filteredVariants.map((variant) => ({
      id: variant.id,
      name: variant.name,
      skus: variant.skus.map((sku) => ({
        id: sku.id,
        size: sku.size,
        price: Number(sku.price),
        multiple_quantity: sku.multiple_quantity,
        price_tables_skus: sku.price_tables_skus,
      })),
    })),
    images: product.product_images.map((img) => `${baseUrl}${img.url}`),
  };

  return dto;
};

//GET count
export const countProducts = async () => {
  return prisma.products.count({
    where: { deleted_at: null },
  });
};