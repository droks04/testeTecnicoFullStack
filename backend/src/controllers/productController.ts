import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import * as productReadService from "../services/productReadService";
import * as productWriteService from "../services/productWriteService";
import * as productFiltersService from "../services/productFilterService";

const prisma = new PrismaClient();

// GET todos os produtos ativos
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await productReadService.getProducts();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
};

// GET produto por id (ativo)
export const getProductsId = async (req: Request, res: Response) => {
  try {
    const product = await productReadService.getProductsId(Number(req.params.id));
    if (!product) return res.status(404).json({ error: "Produto não encontrado" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar produto" });
  }
};

// POST /products
export const postProducts = async (req: Request, res: Response) => {
  try {
    const product = await productWriteService.createProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    console.error("Erro ao criar produto:", err);
    res.status(500).json({ error: "Erro ao criar produto" });
  }
};


// PUT /products/:id
export const putProducts = async (req: Request, res: Response) => {
  try {
    const productId = Number(req.params.id);
    if (isNaN(productId)) {
      return res.status(400).json({ error: "ID inválido" });
    }
    const product = await productWriteService.updateProduct(productId, req.body);
    res.json(product);
  } catch (err) { 
    console.error("Erro no PUT:", err);
    res.status(500).json({ error: "Erro ao atualizar produto" }); 
  }
};

// DELETE /products/:id
export const deleteProducts = async (req: Request, res: Response) => {
  try {
    const productId = Number(req.params.id);
    if (isNaN(productId)) {
      return res.status(400).json({ error: "ID inválido" });
    }
    const product = await productWriteService.deleteProduct(productId);
    res.json(product);
  } catch (err) {
    console.error("Erro no DELETE:", err);
    res.status(500).json({ error: "Erro ao remover produto" });
  }
};

//Filters
export const productsFilters = async (req: Request, res: Response) => {
  try {
    const filters = await productFiltersService.getProductsFilters();
    res.json(filters);
  } catch (err) {
    console.error("Erro ao buscar filtros:", err);
    res.status(500).json({ error: "Erro ao buscar filtros" });
  }
};

  //GET count
export const countProducts = async (req: Request, res: Response) => {
  try {
    const count = await productReadService.countProducts();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: "Erro ao contar produtos" });
  }
};
