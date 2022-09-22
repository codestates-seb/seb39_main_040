import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot } from "@fortawesome/free-solid-svg-icons";

const HeaderBox = styled.header`
  position: fixed;
  top: 0;
  height: 70px;
  //min-width: 1200px;
  width: 100%;

  // 헤더 사이즈 확인용
  /* border: 1px solid red; */

  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #735757;
`;

const LogoTitle = styled.h1`
  display: grid;
  grid-template-columns: 600px;
  font-size: 1.7rem;
  margin-left: 50px;
  span {
    padding-left: 10px;
  }

  a {
    text-decoration: none;
    color: #735757;
  }
`;

const LoginBox = styled.div`
  align-items: center;
  display: flex;
  padding: 20px;
  z-index: 999;
  margin-right: 30px;
  button {
    margin-right: 10px;
    font-size: 1rem;
    border: none;
    color: #735757;
    font-weight: bold;
  }
`;

const UserBox = styled.div`
  align-items: center;
  display: flex;
  padding: 10px;
  z-index: 999;
  margin-right: 30px;
  button {
    //margin-right: 5px;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    color: #735757;
  }

  img {
    border-radius: 20px;
    width: 40px;
    height: 40px;
    margin-left: 15px;
    margin-right: 20px;
  }
`;

const Header = () => {
  // 로그인 상태에 따른 헤더 변경 (임시 state)
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <HeaderBox>
        <LogoTitle>
          <a href="/">
            <FontAwesomeIcon icon={faMugHot} />
            <span>Coffee With Me</span>
          </a>
        </LogoTitle>
        {isLogin === false ? (
          <LoginBox>
            <button onClick={() => setIsLogin(true)}>Login</button>
            <button>Sign up</button>
          </LoginBox>
        ) : (
          <UserBox>
            <button onClick={() => setIsLogin(false)}>Logout</button>
            <img src="https://mblogthumb-phinf.pstatic.net/MjAyMDA1MTVfOSAg/MDAxNTg5NDcxOTQ5NzA1.tj3oVTxxksmb7qcx9B1ICCWuJws6-RpyahOvpVyvhscg.aX0bh7Q4uQXj2HPJ8W_qY6qf1X1dK-fDq5yo2UKuFBog.JPEG.sdon1222/IMG_9874.JPG?type=w800" />
          </UserBox>
        )}
      </HeaderBox>
    </>
  );
};

export default Header;
