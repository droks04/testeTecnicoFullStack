import React, { useState } from "react";
import styled from "styled-components";
import { IoInformationSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
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
  background-color: #819DA8
`;

const RightArrow = styled(Arrow)`
  right: 8px;
  color: #fff;
  background-color: #819DA8
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
  font-size: 14px; /* tamanho da lupa */
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
  font-size: 14px; /* tamanho da lupa */
  color: #fff;
`;

interface ProductImageCarouselProps {
  images: string[];
  title: string;
  content: {
    name: string;
    reference: string;
    brand: string;
    category: string;
  };
}


const ProductImageCarousel: React.FC<ProductImageCarouselProps> = ({ images, content }) => {
  const [current, setCurrent] = useState(0);
  const { name, reference, brand, category } = content;

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  console.log("Images recebidas no Carousel:", images);

  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const openSearchModal = () => setIsSearchOpen(true);
  const closeSearchModal = () => setIsSearchOpen(false);

  return (
    <CarouselContainer>
      <MainImgContainer>
        <LeftArrow onClick={prev}>◀</LeftArrow>
        <RightArrow onClick={next}>▶</RightArrow>
        <Image src={images[current]} alt="Produto" />  
      </MainImgContainer>
     
      <Thumbnails>
        <SearchButton onClick={openSearchModal}>
          <SearchIcon/>
        </SearchButton>
        <SearchModal
  isOpen={isSearchOpen}
  onClose={closeSearchModal}
  onSearch={async (value: string) => {
    try {
      const response = await fetch(`http://localhost:3333/products/search?reference=${value}`);

      if (response.status === 404) {
        alert("Produto não encontrado!");
        return;
      }

      if (!response.ok) {
        throw new Error("Erro ao buscar produto");
      }

      const product = await response.json();
      console.log("Produto encontrado:", product);

    } catch (error) {
      console.error("Erro ao buscar produto:", error);
      alert("Erro ao buscar produto");
    }
  }}
/>


        <InfoButton onClick={openModal}>i</InfoButton>     
        <InfoModal
          isOpen={isOpen}
          onClose={closeModal}
          title="Informações do Produto"
          content={{
            name,
            reference,
            brand,
            category
          }}
        />

        {images.map((img, index) => (
          <Thumbnail
            key={index}
            src={img}        // usa a URL da prop
            active={index === current}
            onClick={() => setCurrent(index)}
          />
        ))}

        <CartButton>
          <CartIcon/>
        </CartButton>
      </Thumbnails>
    </CarouselContainer>
  );
};


export default ProductImageCarousel;
