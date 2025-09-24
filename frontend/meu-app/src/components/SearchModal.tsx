import React, { useState } from "react";
import styled from "styled-components";


interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (value: string) => void;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: #fff;
  padding: 20px;
  width: 400px;
  height: 26vw;
  max-width: 90%;
  border-radius: 8px;
  position: relative;
  margin: 8px;
`;

const Title = styled.h2`
  font-size: 17px;
  font-weight: 550;
  margin-top: 0px;
  color: #333;
`;

const Input = styled.input`
  width: 80%;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
  outline: none;
  font-size: 14px;
  background-color: #fff;
  color: #000;

  &:focus {
    border-color: #007bff;
  }
`;

const ButtonClose = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  border: none;
  background-color: #fff;
  color: #000;
  font-size: 1.6rem;
  cursor: pointer;
`;

const SearchButton = styled.button`
  border: none;
  background-color: #819da8;
  color: #fff;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 4px;
  position: absolute;
  right: 2vw;
  bottom: 1.5vw;
`;

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    onSearch(searchValue);
    setSearchValue("");
  };

  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalContainer>
        <Title>Buscar por referência</Title>
        <Input
          type="text"
          placeholder="Digite a referência..."
          value={searchValue}
         onChange={(e) => setSearchValue(e.target.value)}
        />
        <ButtonClose onClick={onClose}>×</ButtonClose>
        <SearchButton onClick={handleSearch}>Buscar</SearchButton>
      </ModalContainer>
    </Overlay>
  );
};



