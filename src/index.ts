import { server } from "./server/server.js"; 

const PORT = 3333;

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
