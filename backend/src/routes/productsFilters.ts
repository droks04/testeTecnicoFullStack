import { Router } from "express";
import { productsFilters } from "../controllers/productController.js";


const productsFiltersRouter = Router();

// GET filtros
productsFiltersRouter.get("/filters", productsFilters);

export { productsFiltersRouter };
