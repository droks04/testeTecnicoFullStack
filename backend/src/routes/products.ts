import { Router } from "express";
import { getProducts } from "../controllers/productController";
import { getProductsId } from "../controllers/productController";
import { postProducts } from "../controllers/productController";
import { putProducts } from "../controllers/productController";
import { deleteProducts } from "../controllers/productController";
import { countProducts } from "../controllers/productController";
import { SearchReference } from "../controllers/productController";

const productsRouter = Router();


//GET count
productsRouter.get("/count", countProducts)

// GET todos os produtos ativos
productsRouter.get("/", getProducts);

// POST /products
productsRouter.post("/", postProducts);

//GET Seach reference
productsRouter.get("/search", SearchReference); 

// GET produto por id (ativo)
productsRouter.get("/:id", getProductsId);

//Metodo PUT
productsRouter.put("/:id", putProducts);

// Soft delete
productsRouter.delete("/:id", deleteProducts);



export default productsRouter;
