import { prisma } from "../database/prisma";

const baseUrl = "http://localhost:3333/";

// GET todos os produtos ativos
export const getProducts = async () => {
  const products = await prisma.products.findMany({
    where: { deleted_at: null },
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
            select: {
              id: true,
              size: true,
              price: true,
              stock: true,
              min_quantity: true,
            },
          },
        },
      },
      product_images: { select: { id: true, url: true } },
    },
  });

  return products.map((product) => ({
    ...product,
    images: product.product_images.map((img) => `${baseUrl}${img.url}`),
  }));
};

// GET produto por id (ativo)
export const getProductsId = async (id: number) => {
  return prisma.products.findFirst({
    where: {
      id,
      deleted_at: null, // garante que só traz produtos não deletados
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
          skus: { select: { id: true, size: true, price: true } },
        },
      },
      product_images: { select: { id: true, url: true } },
    },
  });
};

//GET reference
export const findProductByReference = async (reference: string) => {
  return prisma.products.findFirst({
     where: {
      reference,
      deleted_at: null,
    },
    include: {
      brands: true,
      categories: true,
    },
  });
};

//GET count
export const countProducts = async () => {
  return prisma.products.count({
    where: { deleted_at: null },
  });
};