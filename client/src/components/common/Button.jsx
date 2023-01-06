import styled from "styled-components";
import React from "react";

const Button = ({ children }) => {
  return <Btn>{children}</Btn>;
};

export default Button;

const Btn = styled.button`
  width: auto;
  padding: 18px;
  height: 57px;
  line-height: 50%;
  background-color: var(--white-010);
  font-size: 22px;
  font-weight: 700;
  color: var(--green-010);
  border-radius: 6px;
  border: 2px solid var(--green-010);
  cursor: pointer;
  :hover {
    background-color: var(--green-010);
    color: var(--white-010);
  }
`;
