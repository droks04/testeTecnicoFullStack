import { prisma } from "../database/prisma";

const baseUrl = "http://localhost:3333/";

// GET todos os produtos ativos
export const getProducts = async () => {
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
      brands: { select: { id: true, name: true } },
      categories: { select: { id: true, name: true } },
      variants: {
        select: {
          id: true,
          name: true,
          skus: {
            where: {
              price_tables_skus: { some: {} } // filtra apenas SKUs com preço
            },
            select: {
              id: true,
              size: true,
              price: true,
              stock: true,
              multiple_quantity: true,
              price_tables_skus: { select: { price_table_id: true } },
            },
          },
        },
      },
      product_images: { select: { id: true, url: true } },
    },
  });

  const filteredProducts = products.map((product) => {
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
      ...product,
      variants: validVariants,
      images: product.product_images.map((img) => `${baseUrl}${img.url}`),
    };
  });

  return filteredProducts.filter(p => p.variants.length > 0);
};

// GET produto por id (ativo)
export const getProductsId = async (id: number) => {
   const product = await prisma.products.findFirst({
    where: {
      id,
      deleted_at: null,
    },
    select: {
      id: true,
      name: true,
      reference: true,
      description: true,
      categories: { select: { name: true } },
      brands: { select: { name: true } },
      variants: {
        select: {
          id: true,
          name: true,
          skus: { 
            select: { 
              id: true, 
              size: true, 
              price: true, 
              multiple_quantity: true,
              price_tables_skus: { select: { price_table_id: true } }
            } 
          },
        },
      },
      product_images: { select: { id: true, url: true } },
    },
  });

  if (!product) return null;

  // Filtra variantes cujos SKUs estão todos na mesma tabela de preço
  const filteredVariants = product.variants.filter(variant => {
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

  return { ...product, variants: filteredVariants };
};

//GET reference
export const findProductByReference = async (reference: string) => {
  return prisma.products.findFirst({
      where: {
      reference,
      deleted_at: null,
    },
    select: {
      id: true,
      name: true,
      reference: true,
      description: true,
      categories: { select: { name: true } },
      brands: { select: { name: true } },
      variants: {
        select: {
          id: true,
          name: true,
          skus: { 
            select: { 
              id: true, 
              size: true, 
              price: true, 
              multiple_quantity: true,
              price_tables_skus: { select: { price_table_id: true } }
            } 
          },
        },
      },
      product_images: { select: { id: true, url: true } },
    },
  });
};

//GET count
export const countProducts = async () => {
  return prisma.products.count({
    where: { deleted_at: null },
  });
};