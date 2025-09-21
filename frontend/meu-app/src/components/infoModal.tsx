import React from "react";
import styled from "styled-components";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: {
    name: string;
    reference: string;
    brand: string;
    category: string;
  };
}

const Overlay = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: #fff;
  padding: 20px;
  width: 400px;
  max-width: 90%;
  border-radius: 8px;
  position: relative;
  margin: 8px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  border: none;
  background-color: #fff;
  color: #000;
  font-size: 1.6rem;
  cursor: pointer;
`;

const ModalTitle = styled.h4`
  margin-top: 0;
  color: #000;
`;

const ModalName = styled.p`
  margin: 10px 0 0 0;
  color: #000;
  font-size: 14px;
`;

const ModalReference = styled.p`
  margin: 10px 0 0 0;
  color: #000;
  font-size: 14px;
`;

const ModalBrand = styled.p`
  margin: 10px 0 0 0;
  color: #000;
  font-size: 14px;
`;

const ModalCategory = styled.p`
  margin: 10px 0 0 0;
  color: #000;
  font-size: 14px;
`;

const Span = styled.span`
  margin: 10px 0 0 0;
  color: #000;
  font-size: 14px;
  font-weight: bold;
`;

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, title, content }) => {
  const { name, reference, brand, category } = content;

  return (
    <Overlay isOpen={isOpen}>
      <ModalContainer>
        <CloseButton onClick={onClose}>×</CloseButton>
        <ModalTitle>{title}</ModalTitle>
        <ModalName><Span>Nome: </Span>{name}</ModalName>
        <ModalReference><Span>Referência</Span> {reference}</ModalReference>
        <ModalBrand><Span>Marca: </Span>{brand}</ModalBrand>
        <ModalCategory><Span>Categoria: </Span>{category}</ModalCategory>
      </ModalContainer>
    </Overlay>
  );
};
