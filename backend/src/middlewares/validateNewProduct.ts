import { Request, Response, NextFunction } from "express";
import { prisma } from "../database/prisma";

export const validateProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { name, reference, variants, skus } = req.body;

  if (!name || !reference) {
    return res.status(400).json({ error: "name e reference são obrigatórios" });
  }

  if (!variants || !Array.isArray(variants) || variants.length === 0) {
    return res.status(400).json({ error: "Deve haver ao menos uma variante" });
  }

   if (
  !variants || !Array.isArray(variants) || variants.length === 0 || !variants.some(v => Array.isArray(v.skus) && v.skus.length > 0)
) {
  return res.status(400).json({ error: "Deve haver ao menos um SKU" });
}

// Verifica referência única
const existingReference = await prisma.products.findUnique({
  where: { reference },
});
  if (existingReference) {
    return res.status(400).json({ error: "Reference já existe" });
  }

  next();
};
