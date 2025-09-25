import { prisma } from "../database/prisma";
import { BrandFilterDTO, TypeFilterDTO, GenderFilterDTO, CategoryFilterDTO, PromptDeliveryDTO, ProductFiltersDTO } from "../models/DTOs/productFilter.dto";

//Filters
export const getProductsFilters = async (): Promise<ProductFiltersDTO> => {
  const whereCondition = { deleted_at: null };

  const brandsRaw = await prisma.products.groupBy({
    by: ["brand_id"],
    where: whereCondition,
    _count: { id: true },
  });

  const brands: BrandFilterDTO[] = await Promise.all(
    brandsRaw.map(async (b) => {
      const brand = await prisma.brands.findUnique({ where: { id: b.brand_id } });
      return { id: b.brand_id, name: brand?.name ?? null, quantity: b._count.id };
    })
  );

  const typesRaw = await prisma.products.groupBy({
    by: ["type"],
    where: whereCondition,
    _count: { id: true },
  });
  const types: TypeFilterDTO[] = typesRaw.map((t) => ({ name: t.type ?? null, quantity: t._count.id }));

  const gendersRaw = await prisma.products.groupBy({
    by: ["gender"],
    where: whereCondition,
    _count: { id: true },
  });
  const genders: GenderFilterDTO[] = gendersRaw.map((g) => ({ name: g.gender ?? null, quantity: g._count.id }));

  const categoriesRaw = await prisma.products.groupBy({
    by: ["category_id", "subcategory_id"],
    where: whereCondition,
    _count: { id: true },
  });

  const categoriesMap: Record<number, CategoryFilterDTO> = {};

  for (const c of categoriesRaw) {
    const category = await prisma.categories.findUnique({ where: { id: c.category_id } });

    if (!categoriesMap[c.category_id]) {
      categoriesMap[c.category_id] = { name: category?.name ?? null, quantity: 0, subcategories: [] };
    }

    categoriesMap[c.category_id].quantity += c._count.id;

    if (c.subcategory_id) {
      const subcategory = await prisma.subcategories.findUnique({ where: { id: c.subcategory_id } });
      categoriesMap[c.category_id].subcategories.push({
        name: subcategory?.name ?? null,
        quantity: c._count.id,
      });
    }
  }

  const categories: CategoryFilterDTO[] = Object.values(categoriesMap);

  const promptDeliveryRaw = await prisma.products.groupBy({
    by: ["prompt_delivery"],
    where: whereCondition,
    _count: { id: true },
  });

  const promptDelivery: PromptDeliveryDTO = {};
  promptDeliveryRaw.forEach((p) => {
    promptDelivery[p.prompt_delivery?.toString() ?? "unknown"] = p._count.id;
  });

  return { brands, types, genders, categories, promptDelivery };
};
