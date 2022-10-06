import React from "react";
import styled from "styled-components";
import Logo from "../../assets/CoffeeWithMe.svg";

const FooterWrapper = styled.footer`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  position: absolute;
  /* position: fixed; */
  bottom: 0;
  left: 0;
  background-color: var(--white-010);
  height: 170px;
  width: 100vw;
  color: var(--green-010);
  padding: 10px 110px 12px 110px;
  padding: 20px 50px;
  box-shadow: 6px 6px 15px var(--gray-020);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 2000px;
  height: 130px;
`;

const LogoTitle = styled.div`
  a {
    img {
      width: 250px;
    }
  }
`;
const TeamList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  p {
    font-weight: 500;
    font-size: 20px;
  }
  .text {
    margin-top: 6px;
  }
  a {
    text-decoration: none;
    color: var(--green-010);
    font-weight: 500;
    line-height: 30px;
    margin-right: 15px;
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <Content>
        <LogoTitle>
          <a href="/">
            <img src={Logo} />
          </a>
        </LogoTitle>
        <TeamList>
          <div className="title">
            <p>Team : Fall In Coffee</p>
          </div>
          <div className="text">
            <a href="https://github.com/leesh26">BE 이소희</a>
            <a href="https://github.com/Choi-Young-Eun">BE 최영은</a>
            <a href="https://github.com/dmsyddl">FE 조은영</a>
            <a href="https://github.com/hongseonga">FE 홍성아</a>
          </div>
        </TeamList>
      </Content>
    </FooterWrapper>
  );
};

export default Footer;
