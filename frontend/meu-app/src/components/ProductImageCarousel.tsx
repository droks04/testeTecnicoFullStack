import React, { useState } from "react";
import styled from "styled-components";
import { IoInformationSharp } from "react-icons/io5";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { InfoModal } from "../components/infoModal.js";
import { SearchModal } from "../components/SearchModal.tsx";

const CarouselContainer = styled.div`
  display: flex;
  flex-direction: column;   
  align-items: center;
  gap: 10px;              
  max-width: 100%;
  margin: 0 auto;          
`;

const MainImgContainer = styled.div`
  border-bottom: 1px solid #9BA5AD;
`;

const Image = styled.img`
  max-width: 100%;      
  max-height: 128vw;     
  min-width: 100%;       
  min-height: 128vw;    

  @media screen and (max-height: 850px) {
    max-height: 124vw; 
    min-height: 124vw; 
  }

  @media screen and (max-height: 667px) {
    max-height: 100vw; 
    min-height: 100vw; 
  }
`;

const Arrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.7);
  border: none;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
`;

const LeftArrow = styled(Arrow)`
  left: 8px;
  color: #fff;
  background-color: #819DA8;
`;

const RightArrow = styled(Arrow)`
  right: 8px;
  color: #fff;
  background-color: #819DA8;
`;

const Thumbnails = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 10px; 
`;

const Thumbnail = styled.img<{ active?: boolean }>`
  width: 60px;
  height: 60px;
  border-radius: 6px;
  border: ${(props) => (props.active ? "2px solid #819DA8" : "1px solid #819DA8")};
  cursor: pointer;
`;

const InfoButton = styled(IoInformationSharp)`
  margin-top: 20px;
  font-size: 20px;
  color: #fff;
  background-color: #819da8; 
  border-radius: 10px;
  width: 26px;
  height: 26px;
`;

const SearchButton = styled.button`
  margin-top: 20px;
  width: 26px;
  height: 26px;
  border-radius: 10px;
  background-color: #819da8; 
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
`;

const SearchIcon = styled(FaSearch)`
  font-size: 14px;
  color: #fff;
`;

const CartButton = styled.button`
  margin: 20px 30px 0px 0px;
  width: 26px;
  height: 26px;
  border-radius: 10px;
  background-color: #819da8; 
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
`;

const CartIcon = styled(FaShoppingCart)`
  font-size: 14px;
  color: #fff;
`;

interface ProductImageCarouselProps {
  images: string[];
  content: {
    name: string;
    reference: string;
    brand: string;
    category: string;
  };
}

const ProductImageCarousel: React.FC<ProductImageCarouselProps> = ({ images, content }) => {
  const [current, setCurrent] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [productData, setProductData] = useState(content);
  const [productImages, setProductImages] = useState(images);

  
  React.useEffect(() => {
    setProductImages(images);
    setCurrent(0);
  }, [images]);

  
  React.useEffect(() => {
    setProductData(content);
  }, [content]);

  const prev = () => setCurrent((c) => (c === 0 ? productImages.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === productImages.length - 1 ? 0 : c + 1));

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const openSearchModal = () => setIsSearchOpen(true);
  const closeSearchModal = () => setIsSearchOpen(false);

  const handleSearch = async (value: string) => {
    const reference = value.trim();
    try {
      const response = await fetch(`http://localhost:3333/products/search?reference=${reference}`);
      if (response.status === 404) {
        alert("Produto não encontrado!");
        return;
      }
      if (!response.ok) throw new Error("Erro ao buscar produto");

      const product = await response.json();
      console.log("Produto encontrado:", product);

      setProductData({
        name: product.name,
        reference: product.reference,
        brand: product.brands.name,
        category: product.categories.name,
      });
      setProductImages(product.product_images.map((img: any) => `http://localhost:3333/${img.url}`));
      setCurrent(0);
      closeSearchModal();
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
      alert("Erro ao buscar produto");
    }
  };

  return (
    <CarouselContainer>
      <MainImgContainer>
        <LeftArrow onClick={prev}>◀</LeftArrow>
        <RightArrow onClick={next}>▶</RightArrow>
        <Image src={productImages[current]} alt="Produto" />
      </MainImgContainer>

      <Thumbnails>
        <SearchButton onClick={openSearchModal}>
          <SearchIcon />
        </SearchButton>

        <SearchModal isOpen={isSearchOpen} onClose={closeSearchModal} onSearch={handleSearch} />

        <InfoButton onClick={openModal}>i</InfoButton>
        <InfoModal isOpen={isOpen} onClose={closeModal} title="Informações do Produto" content={productData} />

        {productImages.map((img, index) => (
          <Thumbnail key={index} src={img} active={index === current} onClick={() => setCurrent(index)} />
        ))}

        <CartButton>
          <CartIcon />
        </CartButton>
      </Thumbnails>
    </CarouselContainer>
  );
};


export default ProductImageCarousel;
