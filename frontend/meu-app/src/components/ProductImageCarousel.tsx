import React, { useState } from "react";
import styled from "styled-components";
import { IoInformationSharp } from "react-icons/io5";
import { FaSearch, FaShoppingCart } from "react-icons/fa";

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
  currentIndex?: number;
  totalProducts?: number;
  onProductChange?: (newIndex: number) => void;
  onOpenSearch: () => void; 
  onOpenInfo: () => void;   
}

const ProductImageCarousel: React.FC<ProductImageCarouselProps> = ({
  images,
  content,
  currentIndex = 0,
  totalProducts = 1,
  onProductChange,
  onOpenSearch,
  onOpenInfo,
}) => {
  const [current, setCurrent] = useState(0);

  const [productData, setProductData] = useState(content);
  const [productImages, setProductImages] = useState(images);

  
  React.useEffect(() => {
    setProductImages(images);
    setCurrent(0);
  }, [images]);

  
  React.useEffect(() => {
    setProductData(content);
  }, [content]);

  // Buscar próximo ou anterior produto na mesma categoria
  const prevProduct = () => {
    const newIndex = (currentIndex - 1 + totalProducts) % totalProducts;
    if (typeof onProductChange === "function") onProductChange(newIndex);
  };

  const nextProduct = () => {
    const newIndex = (currentIndex + 1) % totalProducts;
    if (typeof onProductChange === "function") onProductChange(newIndex);
  };

  return (
    <CarouselContainer>
      <MainImgContainer>
        <LeftArrow onClick={prevProduct}>◀</LeftArrow>
        <RightArrow onClick={nextProduct}>▶</RightArrow>
        <Image src={productImages[current]} alt="Produto" />
      </MainImgContainer>

      <Thumbnails>
        <SearchButton onClick={onOpenSearch}>
          <SearchIcon />
        </SearchButton>

        <InfoButton onClick={onOpenInfo}>i</InfoButton>

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
