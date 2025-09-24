import './styles.css'
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductImageCarousel from "../../components/ProductImageCarousel.tsx";
import ProductInfo from "../../components/ProductInfo.tsx";
import ProductSizes from "../../components/ProductSizes.tsx";
import QuantitySelector from "../../components/QuantitySelector.tsx";
import ProductHeader from "../../components/ProductHeader.tsx";
import { SearchModal } from "../../components/SearchModal.tsx";
import { InfoModal } from "../../components/infoModal.tsx";
import api from  "../../services/api"

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
  id: number;
  name: string;
  skus: Sku[];
}

interface Sku {
  id: number;
  size: string;
  price: string;
  multiple_quantity: number;
}

interface ProductImage {
  id: number;
  url: string;
}

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const [categories, setCategories] = useState<string[]>([]);

  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

//Variaveis para manipulação das modais
const [isSearchOpen, setIsSearchOpen] = useState(false);
const [isInfoOpen, setIsInfoOpen] = useState(false);

const openSearchModal = () => setIsSearchOpen(true);
const closeSearchModal = () => setIsSearchOpen(false);

const openInfoModal = () => setIsInfoOpen(true);
const closeInfoModal = () => setIsInfoOpen(false);


  const [quantities, setQuantities] = useState<{ 
  [productId: string]: { quantity: number; currentValue: number } 
}>({});

  useEffect(() => {
    api.get("/products")
      .then((res) => {
        const allProducts: Product[] = res.data;
        setProducts(allProducts);

        const uniqueCategories = Array.from(new Set(allProducts.map(p => p.categories.name)));
        setCategories(uniqueCategories);
      })
      .catch((err) => console.error(err));
  }, []);

const filteredProducts = products.filter(
      p => p.categories.name === categories[currentCategoryIndex]
    );

const currentProduct = filteredProducts[currentProductIndex];


const handleSearch = (reference: string) => {
  const foundIndex = filteredProducts.findIndex(
    (p) => p.reference.toLowerCase() === reference.toLowerCase()
  );

  if (foundIndex !== -1) {
    setCurrentProductIndex(foundIndex);
    setIsSearchOpen(false);
  } else {
    alert("Produto não encontrado");
  }
};

// Navegação entre produtos na categoria
const nextProduct = () => {
    setCurrentProductIndex((prev) => (prev + 1) % filteredProducts.length);
  };
  const prevProduct = () => {
    setCurrentProductIndex((prev) => (prev - 1 + filteredProducts.length) % filteredProducts.length);
  };

// Navegação entre categorias
  const nextCategory = () => {
    setCurrentCategoryIndex((prev) => (prev + 1) % categories.length);
    setCurrentProductIndex(0);
  };
  const prevCategory = () => {
    setCurrentCategoryIndex((prev) => (prev - 1 + categories.length) % categories.length);
    setCurrentProductIndex(0); 
  };

  return (
    <>
      {currentProduct && (
        <ProductheaderContainer>
         <ProductHeader
            title={categories[currentCategoryIndex]} 
            currentIndex={currentProductIndex}
            total={filteredProducts.length}
            onChange={setCurrentProductIndex} 
            prev={prevProduct}
            next={nextProduct}
            prevCategory={prevCategory}
            nextCategory={nextCategory}
          />
        </ProductheaderContainer>
      )}
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
            currentIndex={currentProductIndex}
            totalProducts={filteredProducts.length}
            onProductChange={setCurrentProductIndex}
            onOpenSearch={openSearchModal}
            onOpenInfo={openInfoModal}
        />
        )}

         <SearchModal
          isOpen={isSearchOpen}
          onClose={closeSearchModal}
          onSearch={handleSearch}
        />

        <InfoModal
            isOpen={isInfoOpen}
            onClose={closeInfoModal}
            title="Informações do Produto"
            content={{
              name: currentProduct?.name || "",
              reference: currentProduct?.reference || "",
              brand: currentProduct?.brands?.name || "",
              category: currentProduct?.categories?.name || "",
            }}
          />
</ContainerCarousel>

<ProductFooter>
  {currentProduct && (
     <ProductInfo 
      name={currentProduct.name}
      price={parseFloat(currentProduct.variants[0].skus[0].price)}
      ref={currentProduct.reference}
    />
  )}

  {currentProduct && (
    <QuantitySelector
      productId={currentProduct.reference}
      skus={currentProduct.variants[0].skus}
      quantity={quantities[currentProduct.reference]?.quantity || 0}
      currentValue={quantities[currentProduct.reference]?.currentValue || 0}
      onChange={(newQuantity, newCurrentValue) => {
        setQuantities((prev) => ({
          ...prev,
          [currentProduct.reference]: {
            quantity: newQuantity,
            currentValue: newCurrentValue,
          },
        }));
      }}
    />
  )}

<ProductSizes skus={currentProduct?.variants?.[0]?.skus || []}  />

</ProductFooter>
    </>
  );
};

export default App;
