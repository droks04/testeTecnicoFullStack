import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 10px 0px 18px 0px;
  
    @media screen and (max-height: 668px) {
     margin: 0px;
  }
`;

const Button = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 20px;
  background-color: #819DA8;
  color: #fff;
  border: none;

   &:active {
    background-color: #567079;
  
  }
`;

const Quantity = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background-color: #fff;
  color: #819DA8;
  border: 1px solid;
  padding: 0px 5px;
`;

const ContainerValorAtual = styled.div`
`;

const ValorLabel = styled.h5`
  color: #000; 
  margin: 0px 20px 0px 20px;
`;

const ValorAtual = styled.span`
  color: #333;
`;

const ValorAcumulado = styled.span`
  color: #333;
  margin-left: 8vw;
`;

const ContainerValorAcumulado = styled.div`
`;

interface QuantitySelectorProps {
  productId: string;
  skus: { price: string; multiple_quantity: number; size: string; id?: number }[];
  quantity: number;
  currentValue: number;
  onChange: (newQuantity: number, newCurrentValue: number) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  productId,
  skus,
  quantity,
  currentValue,
  onChange,
}) => {
  const packValue = skus.reduce(
    (acc, sku) => acc + Number(sku.price) * sku.multiple_quantity,
    0
  );

   const [acumulados, setAcumulados] = useState<{ [id: string]: number }>({});

  const handleAdd = () => {
    const newQuantity = quantity + 1;
    onChange(newQuantity, packValue * newQuantity);
  };

  const handleRemove = () => {
    const newQuantity = Math.max(0, quantity - 1);
    onChange(newQuantity, packValue * newQuantity);
  };

   useEffect(() => {
    const novoValorAtual = packValue * quantity;

    setAcumulados((prev) => ({
      ...prev,
      [productId]: novoValorAtual,
    }));
  }, [quantity, packValue, productId]);

   const valorAcumulado = Object.values(acumulados).reduce((a, b) => a + b, 0);

  return (
    <Container>
      <ContainerValorAtual>
        <ValorLabel>Atual</ValorLabel>
        <ValorAtual>R${currentValue.toFixed(2)}</ValorAtual>
      </ContainerValorAtual>

      <Button onClick={handleRemove}>-</Button>
      <Quantity>{quantity}</Quantity>
      <Button onClick={handleAdd}>+</Button>

       <ContainerValorAcumulado>
        <ValorLabel>Acumulado</ValorLabel>
        <ValorAcumulado>R${valorAcumulado.toFixed(2)}</ValorAcumulado>
      </ContainerValorAcumulado>
    </Container>
  );
};

export default QuantitySelector;
