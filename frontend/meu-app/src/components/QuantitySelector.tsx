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
  product: {
    id: string;
    price: number;
  };
}


const QuantitySelector: React.FC<QuantitySelectorProps> = ({ product }) =>{
   const [quantity, setQuantity] = useState(0);


  const [acumulados, setAcumulados] = useState<{ [id: string]: number }>({});

  const packSize = 4;
  const valorAtual = product.price * packSize;

  const valorAcumulado = acumulados[product.id] ?? 0;

  useEffect(() => {
    setAcumulados(prev => ({
      ...prev,
      [product.id]: quantity > 0 ? valorAtual * quantity : 0,
    }));
  }, [quantity, product.id, valorAtual]);

  return (
    <Container>
      <ContainerValorAtual>
        <ValorLabel>Atual</ValorLabel>
        <ValorAtual>R${valorAtual.toFixed(2)}</ValorAtual>
      </ContainerValorAtual>

      <Button onClick={() => setQuantity(q => Math.max(0, q - 1))}>-</Button>
      <Quantity>{quantity}</Quantity>
      <Button onClick={() => setQuantity(q => q + 1)}>+</Button>

      <ContainerValorAcumulado>
        <ValorLabel>Acumulado</ValorLabel>
        <ValorAcumulado>R${valorAcumulado.toFixed(2)}</ValorAcumulado>
      </ContainerValorAcumulado>
    </Container>
  );
};

export default QuantitySelector;
