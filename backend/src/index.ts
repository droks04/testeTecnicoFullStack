import { server } from "./server/server"; 
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const PORT = 3333;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.use("/assets", express.static(path.join(__dirname, "assets")));

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
