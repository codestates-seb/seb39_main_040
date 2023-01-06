import styled from "styled-components";
import React from "react";

const MiddleTitle = ({ children }) => {
  return <TitleArea>{children}</TitleArea>;
};

export default MiddleTitle;

const TitleArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 140px;

  font-size: 28px;
  font-weight: 700;
  text-align: center;
  color: var(--black-010);
  opacity: 0.7;
`;
