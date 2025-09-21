import { Router } from "express";
import { getProducts } from "../controllers/productController.js";
import { getProductsId } from "../controllers/productController.js";
import { postProducts } from "../controllers/productController.js";
import { putProducts } from "../controllers/productController.js";
import { deleteProducts } from "../controllers/productController.js";
import { countProducts } from "../controllers/productController.js";

const productsRouter = Router();


//GET count
productsRouter.get("/count", countProducts)

// GET todos os produtos ativos
productsRouter.get("/", getProducts);

// GET produto por id (ativo)
productsRouter.get("/:id", getProductsId);

// POST /products
productsRouter.post("/", postProducts);
 
//Metodo PUT
productsRouter.put("/:id", putProducts);

// Soft delete
productsRouter.delete("/:id", deleteProducts)



export default productsRouter;
