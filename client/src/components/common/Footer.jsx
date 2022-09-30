import React from "react";
import styled from "styled-components";
import Logo from "../../assets/CoffeeWithMe.svg";

const Wrapper = styled.footer`
  display: flex;
  flex-direction: column;
  //justify-content: center;
  //align-items: center;
  box-sizing: border-box;
  padding-top: 10px;
  width: 100%;
  height: 90px;
  background-color: var(--gray-030);
  opacity: 0.5;
`;

const Img = styled.img`
  max-width: 250px;
`;

const Footer = () => {
  return (
    <Wrapper>
      <Img src={Logo} alt="logo" />
    </Wrapper>
  );
};

export default Footer;
