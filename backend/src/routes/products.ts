import { Router } from "express";
import { getProducts, getProductsId, postProducts, putProducts ,deleteProducts, countProducts, SearchReference} from "../controllers/productController";

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
