import express from "express";
import { router as indexRouter } from '../routes/index.js';
import productsRouter from "../routes/products.js";
import { productsFiltersRouter } from "../routes/productsFilters.js";

const server = express();

server.use(express.json());

// Rota principal
server.use("/", indexRouter);

//Rotas Products
server.use("/products", productsRouter);
server.use("/productsFilters", productsFiltersRouter);


export {server};






