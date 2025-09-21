import React from "react";
import styled from "styled-components";
import { GoArrowSwitch } from "react-icons/go";

const InfoContainer = styled.div`
  margin-top: 8px;
  display: flex;
  gap: 12px;
  align-items: center;
`;

const Name = styled.p`
  font-size: 0.6rem;
  margin: 0;
  color: #666;
  font-weight: bold;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Reference = styled.p`
  font-size: 0.7rem;
  color: #666;
  font-weight: bold;
`;

const Price = styled.p`
 font-size: 0.7rem;
 color: #666;
 font-weight: bold;

  @media (min-width: 768px) {
    font-size: 0.8rem;
  }
`;

const ToggleButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px;        
  border: none;
  background: transparent;
  width: 26px;
  height: 26px;
  background-color: #819da8; 
  border-radius: 100px;
`;

const UpArrowIcon = styled(GoArrowSwitch)`
  transform: rotate(-90deg);
  font-size: 18px;
  color: #fff;
 

`;

const Span = styled.span`
  color: #819da8; 
  padding-right: 3px;

`;

interface ProductInfoProps {
  name: string;
  ref: string;
  price: number;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ name, ref, price }) => {
  return (
    <InfoContainer>
      <ToggleButton> 
        <UpArrowIcon />
      </ToggleButton>

      <Name>{(name)}</Name>
      <Reference><Span>REF:</Span>{(ref)}</Reference>
      <Price><Span>R$</Span>{(price)}</Price>
    </InfoContainer>
  );
};

export default ProductInfo;
