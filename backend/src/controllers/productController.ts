// src/controllers/productController.ts
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const baseUrl = "http://localhost:3333/";

// GET todos os produtos ativos
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.products.findMany({
  take: 3, // apenas os 3 primeiros produtos
  select: {
    id: true,
    name: true,
    reference: true,
    brands: {
      select: {
        id: true,
        name: true,
      },
    },
    categories: {
      select: {
        id: true,
        name: true,
      },
    },
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
    product_images: {
      select: {
        id: true,
        url: true,
      },
    },
  },
});


    // mapear as imagens para URL completa
    const result = products.map((product) => ({
      ...product,
      images: product.product_images.map((img) => `${baseUrl}${img.url}`),
    }));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
};

// GET produto por id (ativo)
export const getProductsId = async (req: Request, res: Response) => {
try {
    const product = await prisma.products.findUnique({
      where: { id: Number(req.params.id) },
      select: {
        id: true,
        name: true,
        reference: true,
        gender: true,
        description: true,
        type: true,
        prompt_delivery: true,

        // pega apenas o nome da categoria
        categories: { select: { name: true } },

        // pega apenas o nome da subcategoria
        subcategories: { select: { name: true } },

        // pega apenas o nome da marca
        brands: { select: { name: true } },

        // pega apenas a chave da empresa
        companies: { select: { id: true } }, // se a "key" for outro campo, ajusta aqui

        // pega as variants
        variants: {
          select: {
            id: true,
            name: true,      // no seu exemplo aparece como "variant_name"
            hex_code: true,
            skus: {
              select: {
                id: true,
                size: true,
                price: true,
                stock: true,
                min_quantity: true,
              },
              where: {
                price_tables_skus: {
                  some: {}, // garante que só traga skus que tenham preços cadastrados
                },
              },
            },
          },
        },
          product_images: {
          select: {
            id: true,
            url: true,  // retorna o caminho da imagem
          },
        },
      },
    });

    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    return res.json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar produto" });
  }
};

// POST /products
export const postProducts = async (req: Request, res: Response) => {
 try {
  const product = await prisma.products.create({
  data: {
    name: req.body.name,
    reference: req.body.reference,
    gender: req.body.gender,
    description: req.body.description,
    type: req.body.type,
    prompt_delivery: req.body.prompt_delivery,
    company_id: req.body.company_id,
    brand_id: req.body.brand_id,
    category_id: req.body.category_id,
    subcategory_id: req.body.subcategory_id,
    erp_id: req.body.erp_id,
    deadline_id: req.body.deadline_id,
    category_order: req.body.category_order,
    composition_data: req.body.composition_data,
    technical_information: req.body.technical_information,
    open_grid: req.body.open_grid,
    ipi: req.body.ipi,
    is_discontinued: req.body.is_discontinued,
    is_launch: req.body.is_launch,
    is_visible: req.body.is_visible,
    colection: req.body.colection,
    st: req.body.st,

    // nested variants e skus
    variants: {
      create: req.body.variants?.map((variant: any) => ({
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


  res.status(201).json(product);
} catch (err: any) {
  console.error("Erro ao criar produto:", err);
  res.status(500).json({ error: err.message });
}
}

//Metodo PUT
export const putProducts = async (req: Request, res: Response) => {
  try {
    const product = await prisma.products.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        name: req.body.name,
        reference: req.body.reference,
        gender: req.body.gender,
        description: req.body.description,
        type: req.body.type,
        prompt_delivery: req.body.prompt_delivery,
        company_id: req.body.company_id,
        brand_id: req.body.brand_id,
        category_id: req.body.category_id,
        subcategory_id: req.body.subcategory_id,
        erp_id: req.body.erp_id,
        deadline_id: req.body.deadline_id,
        category_order: req.body.category_order,
        composition_data: req.body.composition_data,
        technical_information: req.body.technical_information,
        open_grid: req.body.open_grid,
        ipi: req.body.ipi,
        is_discontinued: req.body.is_discontinued,
        is_launch: req.body.is_launch,
        is_visible: req.body.is_visible,
        colection: req.body.colection,
        st: req.body.st,

        variants: {
          upsert: req.body.variants?.map((variant: any) => ({
            where: { id: variant.id ?? 0 }, // se existir, atualiza; se não, cria novo
            update: {
              name: variant.name,
              hex_code: variant.hex_code,
              skus: {
                upsert: variant.skus?.map((sku: any) => ({
                  where: { id: sku.id ?? 0 },
                  update: {
                    size: sku.size,
                    price: parseFloat(sku.price),
                    stock: sku.stock,
                    min_quantity: sku.min_quantity ?? 1,
                    multiple_quantity: sku.multiple_quantity ?? 1,
                    code: sku.code ?? "",
                  },
                  create: {
                    size: sku.size,
                    price: parseFloat(sku.price),
                    stock: sku.stock,
                    min_quantity: sku.min_quantity ?? 1,
                    multiple_quantity: sku.multiple_quantity ?? 1,
                    code: sku.code ?? "",
                  },
                })),
              },
            },
            create: {
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
            },
          })),
        },
      },
    });

    res.status(200).json(product);
  } catch (err: any) {
    console.error("Erro ao atualizar produto:", err);
    res.status(500).json({ error: err.message });
  }

};

//Delete
export const deleteProducts = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await prisma.products.update({
      where: { id: Number(id) },
      data: { deleted_at: new Date() }, // marca como deletado
    });
    res.json({ message: "Produto deletado (soft delete)", product });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

//Filters
export const productsFilters = async (req: Request, res: Response) => {
  try {
      // Brands com nome
      const brandsRaw = await prisma.products.groupBy({
        by: ["brand_id"],
        _count: { id: true },
      });

      const brands = await Promise.all(
        brandsRaw.map(async (b) => {
          const brand = await prisma.brands.findUnique({
            where: { id: b.brand_id },
          });
          return {
            id: b.brand_id,
            name: brand?.name ?? null,
            quantity: b._count.id,
          };
        })
      );

      // Types
      const typesRaw = await prisma.products.groupBy({
        by: ["type"],
        _count: { id: true },
      });

      const types = typesRaw.map((t) => ({
        name: t.type,
        quantity: t._count.id,
      }));

      // Genders
      const gendersRaw = await prisma.products.groupBy({
        by: ["gender"],
        _count: { id: true },
      });

      const genders = gendersRaw.map((g) => ({
        name: g.gender,
        quantity: g._count.id,
      }));

      // Categories + subcategories
      const categoriesRaw = await prisma.products.groupBy({
        by: ["category_id", "subcategory_id"],
        _count: { id: true },
      });

      const categoriesMap: Record<number, { name: string | null; quantity: number; subcategories: any[] }> = {};

      for (const c of categoriesRaw) {
        // Buscar nome da categoria
        const category = await prisma.categories.findUnique({
          where: { id: c.category_id },
        });

        if (!categoriesMap[c.category_id]) {
          categoriesMap[c.category_id] = {
            name: category?.name ?? null,
            quantity: 0,
            subcategories: [],
          };
        }

        // Incrementa quantidade da categoria
        categoriesMap[c.category_id].quantity += c._count.id;

        if (c.subcategory_id) {
          const subcategory = await prisma.subcategories.findUnique({
            where: { id: c.subcategory_id },
          });
          categoriesMap[c.category_id].subcategories.push({
            name: subcategory?.name ?? null,
            quantity: c._count.id,
          });
        }
      }

      const categories = Object.values(categoriesMap);

      // Prompt delivery
      const promptDeliveryRaw = await prisma.products.groupBy({
        by: ["prompt_delivery"],
        _count: { id: true },
      });

      const promptDelivery: Record<string, number> = {};
      promptDeliveryRaw.forEach((p) => {
        promptDelivery[p.prompt_delivery.toString()] = p._count.id;
      });

      res.json({ brands, types, genders, categories, promptDelivery });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao buscar filtros" });
    }
  };

  //GET count
  export const countProducts = async (req: Request, res: Response) => {
  try {
    const total = await prisma.products.count();

    res.status(200).json({ total });
  } catch (err: any) {
    console.error("Erro ao contar produtos:", err);
    res.status(500).json({ error: err.message });
  }
};

//GET reference
export const SearchReference = async (req: Request, res: Response) => {
  try {
    const reference = req.query.reference as string;

    if (!reference) {
      return res.status(400).json({ message: "Parâmetro reference é obrigatório" });
    }

    // Usando findFirst, pois reference não é unique
    const product = await prisma.products.findFirst({
      where: {
        reference: reference, // ou String(reference)
      },
      include: {
        brands: true,
        categories: true,
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    return res.json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao buscar produto", error });
  }
};
