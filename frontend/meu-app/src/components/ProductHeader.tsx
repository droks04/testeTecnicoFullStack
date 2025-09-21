import React from "react";
import styled from "styled-components";
import { GoChevronLeft } from "react-icons/go";

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;        
  height: 60px;    
  padding: 8px 16px;
`;

const CenterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Arrow = styled.button`
  top: 50%;
  transform: translateY(-50%);
  border: none;
  padding: 6px 10px;
  border-radius: 50%;
  cursor: pointer;
`;

const LeftArrow = styled(Arrow)`
  left: 8px;
  color: #819DA8;
  background-color:  #fff;
  margin: 35px 0px 10px 0px;
  width: 27px;
  height: 27px;
  padding: 5px 8px 5px 8px;
`;

const RightArrow = styled(Arrow)`
  right: 8px;
  color: #819DA8;
  background-color: #fff;
  margin: 35px 10px 10px 0px;
  padding: 5px 8px 5px 8px;
`;

const ItemLabel = styled.label`
  margin 0px 10px;
  font-weight: bold;
  font-size: 0.7rem;
`;

const BackButton = styled(GoChevronLeft)`
  font-size: 20px;
  color: #fff;
  background-color: #819da8; 
  border-radius: 10px;
  width: 26px;
  height: 26px;
`;

const FButton = styled.button`
  width: 27px;
  height: 27px;
  border-radius: 20px;
  border: none;
  background-color: #fff;
  color: #819DA8;
 
`;

interface ProductHeaderProps {
  title: string;
  currentIndex: number;
  total: number;
  onChange: (newIndex: number) => void;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({
  title,
  currentIndex,
  total,
  onChange
}) => {
  const prev = () => onChange(currentIndex === 0 ? total - 1 : currentIndex - 1);
  const next = () => onChange(currentIndex === total - 1 ? 0 : currentIndex + 1);

  return (
    <MainContainer>
      <BackButton />

      <CenterGroup>
        <LeftArrow onClick={prev}>◀</LeftArrow>
        <ItemLabel>{title}</ItemLabel>
        <RightArrow onClick={next}>▶</RightArrow>
      </CenterGroup>

      <FButton>F</FButton>
    </MainContainer>
  );
};
export default ProductHeader;