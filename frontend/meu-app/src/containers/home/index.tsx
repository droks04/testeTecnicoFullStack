import './styles.css'

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductImageCarousel from "../../components/ProductImageCarousel.tsx";
import ProductInfo from "../../components/ProductInfo.tsx";
import ProductSizes from "../../components/ProductSizes.tsx";
import QuantitySelector from "../../components/QuantitySelector.tsx";
import ProductHeader from "../../components/ProductHeader.tsx";
import { SearchModal } from "../../components/SearchModal.tsx";
import api from  "../../services/api.js"

const ProductheaderContainer = styled.header`
  width: 100%;
  height: 13vw;
  background-color: #819da8;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ContainerCarousel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px; /* <-- Espaçamento entre todos os filhos */
  width: 100%;
`;

export const ProductFooter = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  border-top: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin: 0 auto;

  @media (max-width: 768px) {}

  @media (max-width: 480px) {
    gap: 6px;
  }

  @media (max-height: 668px) {
    height: 152px;
  }
`;

interface Product {
  name: string;
  reference: string;
  variants: Variant[];
  product_images: ProductImage[];
  brands: { name: string };
  categories: { name: string };
}

interface Variant {
  skus: Sku[];
}

interface Sku {
  price: string;
}

interface ProductImage {
  id: number;
  url: string;
}

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    api.get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const currentProduct = products[currentIndex];

  // Funções de modal
  const openSearchModal = () => setIsSearchOpen(true);
  const closeSearchModal = () => setIsSearchOpen(false);

  // Função de busca por referência
  const handleSearch = async (value: string) => {
    const reference = value.trim();
    try {
      const response = await api.get(`/products/search?reference=${reference}`);

      if (response.status === 404) {
        alert("Produto não encontrado!");
        return;
      }

      const product: Product = response.data;

      // Atualiza o array de produtos com apenas o produto encontrado
      setProducts([product]);
      setCurrentIndex(0);
      closeSearchModal();
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
      alert("Erro ao buscar produto");
    }
  };

  if (!products.length)
    return (
      <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <p>Carregando...</p>
      </div>
    );

  return (
    <>
      {currentProduct && (
        <ProductheaderContainer>
          <ProductHeader
            title={currentProduct.name}
            currentIndex={currentIndex}
            total={products.length}
            onChange={setCurrentIndex}
          />
        </ProductheaderContainer>
      )}

      <SearchModal
        isOpen={isSearchOpen}
        onClose={closeSearchModal}
        onSearch={handleSearch}
      />

      <ContainerCarousel>
  {currentProduct && (
    <ProductImageCarousel 
      images={currentProduct.product_images.map(img => `http://localhost:3333/${img.url}`)}
      content={{
        name: currentProduct.name,
        reference: currentProduct.reference,
        brand: currentProduct.brands.name,
        category: currentProduct.categories.name
      }}
    />
  )}
</ContainerCarousel>

<ProductFooter>
  {currentProduct && (
     <ProductInfo 
      name={currentProduct.name}
      price={parseFloat(currentProduct.variants[0].skus[0].price)}
      ref={currentProduct.reference}
    />
  )}
  <QuantitySelector
    product={{
      id: currentProduct?.name || 'default',
      price: parseFloat(currentProduct?.variants?.[0]?.skus?.[0]?.price || '0'),
    }}
  />
  <ProductSizes />
</ProductFooter>
    </>
  );
};

export default App;
