# Projeto Teste Técnico - Ecatalogos

Este projeto foi desenvolvido como parte do **teste técnico** para a empresa **Ecatalogos**.  

Trata-se de uma **tela de visualização de produtos**, onde é possível **criar um carrinho de compras temporário** e **adicionar ou remover produtos** dinamicamente.

---

## Tecnologias Utilizadas

- **Frontend:** React + TypeScript  
- **Backend:** Node.js + Express  
- **Banco de Dados:** MariaDB  
- **ORM:** Prisma  
- **Gerenciador de Pacotes:** Yarn
- **API:** RESTFUL 

---

## Funcionalidades

- Listagem e visualização de produtos  
- Carrinho de compras temporário  
- Adição e remoção de produtos do carrinho  
- Visualização detalhada do produto com imagens e informações  
- Busca por referência do produto  

---

## Como Rodar o Projeto

Siga os passos abaixo para iniciar o backend e frontend localmente:  

1. **Clone o repositório**
```bash
git clone https://github.com/droks04/testeTecnicoFullStack.git
```
2. **Inicie o backend**
```bash
cd backend
yarn dev
```
3. Inicie o frontend
```bash
cd frontend/meu-app
yarn run dev
```
4. **Acesse a aplicação**

O Vite irá fornecer o endereço local (geralmente http://localhost:5173)  
Abra no navegador para testar todas as funcionalidades

### Arquivos para Teste

- **Corpo JSON para teste do método POST**  
  Contém os dados preenchidos para testar a criação de registros via endpoint POST.  
  [Corpo JSON para teste POST](.testeTecnico2/dumps_json/post-json-vazio.json)

- **Corpo JSON para teste do método PUT**  
  Contém os dados preenchidos para testar a atualização de registros via endpoint PUT.  
  [Corpo JSON para teste PUT](.testeTecnico2/dumps_json/json-pronto.json)  

- **Dump da tabela de imagens**  
  Contém a estrutura da tabela que foi criada para armazenar os caminhos das imagens, permitindo retorná-las pelo servidor.  
  [Corpo JSON para teste PUT](.testeTecnico2/dumps_json/tabela_images.sql)  
  > Observação: além dessa tabela, **nenhuma outra tabela foi criada**. Todas as demais tabelas utilizadas são as fornecidas na dump disponibilizada.

- **Collection do postman**
  Contém a collection que usei para testar os métodos.  
  [Collection Postman](.testeTecnico2/dumps_json/ecatalogos.postman_collection.json)
  

