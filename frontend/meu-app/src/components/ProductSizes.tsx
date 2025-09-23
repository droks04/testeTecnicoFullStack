import React from "react";
import styled from "styled-components";

const SizesContainer = styled.div`
  display: flex;
  gap: 16px;
  margin: 16px 0px 0px;
  background-color: #819da8;
  width: 100%;
  height: auto;
  justify-content: center;
  align-items: flex-end; /* garante que os botões fiquem alinhados */
  padding: 16px;

   @media screen and (max-height: 850px) {
     margin: 0px;
  }

`;

const SizeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const CircleLabel = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #819da8;
  color: #fff;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  position: absolute;
  top: -20px;
`;

const CircleLabels = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  position: absolute;
  top: -22px;
`;

const SizeButton = styled.button`
  padding: 10px 16px;
  border: 1px solid #819da8;
  border-radius: 8px;
  background-color: #fff;
  color: #819da8;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
`;

const Span = styled.span`
  font-size: 20px;
  font-weight: bold;
  margin: 0 8px;
  color: white;
`;

interface ProductSizesProps {
  skus: { price: string; multiple_quantity: number; size: string; id?: number }[];
}

const ProductSizes: React.FC<ProductSizesProps> = ({ skus }) => {
  if (!skus || skus.length === 0) return null;

  const totalQuantity = skus.reduce((acc, sku) => acc + sku.multiple_quantity, 0);

  return (
    <SizesContainer>
      {skus.map((sku) => (
        <SizeWrapper key={sku.id}>
          <CircleLabel>{sku.size}</CircleLabel>
          <SizeButton>{sku.multiple_quantity}</SizeButton>
        </SizeWrapper>
      ))}

      <Span>=</Span>

      <SizeWrapper>
        <CircleLabels>Pack</CircleLabels>
        <SizeButton>{totalQuantity}</SizeButton>
      </SizeWrapper>
    </SizesContainer>
  );
};

export default ProductSizes;