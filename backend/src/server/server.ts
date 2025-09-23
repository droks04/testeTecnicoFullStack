import express from "express";
import cors from "cors";
import { router as indexRouter } from '../routes/index';
import productsRouter from "../routes/products";
import { productsFiltersRouter } from "../routes/productsFilters";

const server = express();

server.use(express.json());
server.use(cors());

// Rota principal
server.use("/", indexRouter);

//Rotas Products
server.use("/products", productsRouter);
server.use("/productsFilters", productsFiltersRouter);


export {server};






