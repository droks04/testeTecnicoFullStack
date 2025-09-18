import { Router } from "express";
import { prisma } from '../prisma.js';

const productsRouter = Router();


// GET todos os produtos ativos
productsRouter.get("/", async (req, res) => {
  try {
    const products = await prisma.products.findMany({
      select: {
        id: true,
        name: true,
        reference: true,
        gender: true,
        description: true,
        type: true,
        prompt_delivery: true,

        categories: { select: { name: true } },
        subcategories: { select: { name: true } },
        brands: { select: { name: true } },
        companies: { select: { id: true } },

        variants: {
          select: {
            id: true,
            name: true,
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
                  some: {}, // só traz SKUs que têm preço
                },
              },
            },
          },
        },
      },
    });

    return res.json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar produtos" });
  }
});

// GET produto por id (ativo)
productsRouter.get("/:id", async (req, res) => {
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
});

// POST /products
productsRouter.post("/", async (req, res) => {
  try {
    const product = await prisma.products.create({
      data: {
        name: req.body.name,
        reference: req.body.reference,
        type: req.body.type,
        gender: req.body.gender,
        prompt_delivery: req.body.prompt_delivery,
        description: req.body.description,
        company_id: req.body.company_id,
        erp_id: req.body.erp_id,
        brand_id: req.body.brand_id,
        deadline_id: req.body.deadline_id,
        category_id: req.body.category_id,
        subcategory_id: req.body.subcategory_id,
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
      },
    });

    res.status(201).json(product);
  } catch (err: any) {
    console.error("Erro ao criar produto:", err);
    res.status(500).json({ error: err.message });
  }
});

//Metodo PUT
productsRouter.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Atualiza o produto pelo ID
    const updatedProduct = await prisma.products.update({
      where: { id: Number(id) },
      data: {
        name: req.body.name,
        reference: req.body.reference,
        type: req.body.type,
        gender: req.body.gender,
        prompt_delivery: req.body.prompt_delivery,
        description: req.body.description,
        company_id: req.body.company_id,
        erp_id: req.body.erp_id,
        brand_id: req.body.brand_id,
        deadline_id: req.body.deadline_id,
        category_id: req.body.category_id,
        subcategory_id: req.body.subcategory_id,
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
      },
    });

    return res.status(200).json(updatedProduct);
  } catch (err: any) {
    console.error(err);

    if (err.code === "P2025") {
      // Prisma: registro não encontrado
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    return res.status(500).json({ error: err.message });
  }
});


// Soft delete
productsRouter.delete("/:id", async (req, res) => {
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
});

export default productsRouter;
