import { prisma } from "../database/prisma";

//Filters
export const getProductsFilters = async () => {
  const whereCondition = { deleted_at: null };

  const brandsRaw = await prisma.products.groupBy({
    by: ["brand_id"],
    where: whereCondition,
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

  const typesRaw = await prisma.products.groupBy({
    by: ["type"],
    where: whereCondition,
    _count: { id: true },
  });

  const types = typesRaw.map((t) => ({
    name: t.type,
    quantity: t._count.id,
  }));

  const gendersRaw = await prisma.products.groupBy({
    by: ["gender"],
    where: whereCondition,
    _count: { id: true },
  });

  const genders = gendersRaw.map((g) => ({
    name: g.gender,
    quantity: g._count.id,
  }));

  const categoriesRaw = await prisma.products.groupBy({
    by: ["category_id", "subcategory_id"],
    where: whereCondition,
    _count: { id: true },
  });

  const categoriesMap: Record<
    number,
    { name: string | null; quantity: number; subcategories: any[] }
  > = {};

  for (const c of categoriesRaw) {
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

  const promptDeliveryRaw = await prisma.products.groupBy({
    by: ["prompt_delivery"],
    where: whereCondition,
    _count: { id: true },
  });

  const promptDelivery: Record<string, number> = {};
  promptDeliveryRaw.forEach((p) => {
    promptDelivery[p.prompt_delivery.toString()] = p._count.id;
  });

  return { brands, types, genders, categories, promptDelivery };
};