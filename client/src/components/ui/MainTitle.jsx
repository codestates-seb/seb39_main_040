import React from "react";
import styled from "styled-components";

const TitleWrapper = styled.div
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ae9e8f;
  width: 100%;
  height: 220px;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  color: #fff;
;

const MainTitle = ({ children }) => {
  return <TitleWrapper>{children}</TitleWrapper>;
};

export default MainTitle;