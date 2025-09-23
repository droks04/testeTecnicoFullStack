import { Router } from "express";
import { getProducts, getProductsId, postProducts, putProducts ,deleteProducts, countProducts, SearchReference } from "../controllers/productController";
import { validateProduct } from "../middlewares/validateNewProduct";
import { validateIdParam } from "../middlewares/validateIdParam";

const productsRouter = Router();


//GET count
productsRouter.get("/count", countProducts)

// GET todos os produtos ativos
productsRouter.get("/", getProducts);

// POST /products
productsRouter.post("/", validateProduct, postProducts);

//GET Seach reference
productsRouter.get("/search", SearchReference); 

// GET produto por id (ativo)
productsRouter.get("/:id", validateIdParam, getProductsId);

//Metodo PUT
productsRouter.put("/:id", putProducts);

// Soft delete
productsRouter.delete("/:id", deleteProducts);

export default productsRouter;
