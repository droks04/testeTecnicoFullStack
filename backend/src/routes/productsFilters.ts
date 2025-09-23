import { Router } from "express";
import { productsFilters } from "../controllers/productController";


const productsFiltersRouter = Router();

// GET filtros
productsFiltersRouter.get("/filters", productsFilters);

export { productsFiltersRouter };
