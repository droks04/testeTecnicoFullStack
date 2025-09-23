import { server } from "./server/server";
import express from "express";
import path from "path";

const PORT = 3333;

server.use("/assets", express.static(path.join(__dirname, "assets")));

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});