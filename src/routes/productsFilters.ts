import { Router } from "express";
import { prisma } from "../prisma.js";

const productsFiltersRouter = Router();

// GET filtros
productsFiltersRouter.get("/filters", async (req, res) => {
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
});

export { productsFiltersRouter };
