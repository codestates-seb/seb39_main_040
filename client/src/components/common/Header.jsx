import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../../assets/CoffeeWithMe.svg";
import useAuthStore from "../../store/useAuth";
import useLoginStore from "../../store/useLoginStore";
import React from "react";

const HeaderWrapper = styled.header`
  z-index: 999;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75px;
  width: 100%;
  border-bottom: 1px solid var(--gray-030);
  padding: 10px 40px;
  background-color: var(--white-010);
`;

const HeaderTitle = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavList = styled.ul`
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  margin-right: 44px;
`;

const NavItem = styled.li`
  padding-top: 10px;
  font-size: 15px;
  font-weight: 400;
  color: var(--black-010);
  opacity: 0.3;
  margin-left: 60px;
`;

const DropBox = styled.div`
  // ?? a 태그를 여기서 해주어야지만 Link가 스타일이 적용되지 않는다.
  a {
    text-decoration: none;
    color: var(--black--010);
    opacity: 0.7;
  }

  .hidden {
    position: absolute;
    top: 100%;
    right: 2%;
    width: 110px;
    text-align: center;
    padding: 10px;
    font-size: 15px;
    transition: 0.3s;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    // 투명도조절로 보이지 않게
    opacity: 0;
  }

  .activate {
    position: absolute;
    top: 100%;
    right: 2%;
    width: 110px;
    text-align: center;
    padding: 10px;
    font-size: 15px;
    transition: 0.3s;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background-color: var(--white-010);
    // 투명도조절로 보이게
    opacity: 1;
  }
`;

// 유저이미지
const UserProfile = styled.img`
  display: inline-block;
  position: absolute;
  top: 10%;
  right: 2%;
  margin-right: 24px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
`;

// 드롭 메뉴
const DropMenu = styled.ul`
  .active &.menu > li {
    text-decoration: none;
    color: var(--black--010);
  }
  button {
    font-size: 14px;
    color: var(--black--010);
    opacity: 0.7;
  }
`;

//드롭 메뉴속 아이템
const DropItem = styled.li`
  padding: 5px;
  &:hover {
    color: var(--green-010);
  }
`;

const Header = () => {
  // const { isLogin, setIsLogin } = useAuthStore();
  const { isLogin, setIsLogin } = useLoginStore();
  const [isOpen, setIsOpen] = useState(true);

  const navigate = useNavigate();

  const logoutHandler = () => {
    axios
      .post(`${process.env.REACT_APP_API}/users/logout`, {
        headers: { AccessToken: sessionStorage.getItem("access_token") },
      })
      .then((res) => {
        console.log("로그아웃완료");
        window.localStorage.removeItem("access_token");
        setIsLogin(!isLogin);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <HeaderWrapper>
      <Link to="/">
        <HeaderTitle src={Logo} alt="logo" />
      </Link>

      {isLogin === true ? (
        <DropBox>
          <UserProfile
            src="https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/944/eabb97e854d5e5927a69d311701cc211_res.jpeg"
            alt="profile"
            onClick={() => setIsOpen(!isOpen)}
          />
          <DropMenu className={isOpen ? "hidden" : "activate"}>
            <Link
              to="/userinfo"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <DropItem>나의정보</DropItem>
            </Link>
            <Link to="/user/wish">
              <DropItem>찜한카페</DropItem>
            </Link>
            <Link to="/user/review">
              <DropItem>나의리뷰</DropItem>
            </Link>
            <button onClick={logoutHandler}>
              <DropItem>로그아웃</DropItem>
            </button>
          </DropMenu>
        </DropBox>
      ) : (
        <NavList>
          <Link to="/login">
            <NavItem>로그인</NavItem>
          </Link>
          <Link to="/signup">
            <NavItem>회원가입</NavItem>
          </Link>
        </NavList>
      )}
    </HeaderWrapper>
  );
};

export default Header;
