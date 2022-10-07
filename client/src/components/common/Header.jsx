import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import instance from "../../api/core";
import styled from "styled-components";

import Logo from "../../assets/CoffeeWithMe.svg";
import useLoginStore from "../../store/useLoginStore";
import Swal from "sweetalert2";

const Header = () => {
  const { isLogin, setIsLogin } = useLoginStore();
  const [isOpen, setIsOpen] = useState(true);
  const [userProfile, setUserProfile] = useState();

  const navigate = useNavigate();

  const logoutHandler = () => {
    Swal.fire({
      title: "로그아웃 하시겠습니까?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "var(--green-010)",
      cancelButtonColor: "var(--red-010)",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        instance
          .post(`${process.env.REACT_APP_API}/users/logout`)
          .then(() => {
            Swal.fire({
              title: "로그아웃 되었습니다.",
              text: "다음에 다시 만나요 😁",
              icon: "success",
              confirmButtonColor: "var(--green-010)",
            });
            navigate("/");
            setIsLogin();
          })
          .catch(() =>
            Swal.fire({
              title: "로그아웃에 실패했습니다",
              text: "다시 시도해주세요",
              icon: "error",
              confirmButtonColor: "var(--green-010)",
            })
          );
      }
    });
  };

  useEffect(() => {
    async function fetchData() {
      if (isLogin) {
        const response = await instance.get(
          `${process.env.REACT_APP_API}/users/information`
        );
        setUserProfile(response.profilePhoto.path);
      }
    }

    fetchData();
  }, []);

  return (
    <HeaderWrapper>
      <Link to="/">
        <HeaderTitle src={Logo} alt="logo" />
      </Link>

      {isLogin === true ? (
        <DropBox>
          <UserProfile
            src={`${userProfile}`}
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

const HeaderWrapper = styled.header`
  z-index: 999;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75px;
  width: 100%;
  box-shadow: 4px 4px 10px var(--gray-030);
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
    opacity: 1;
  }
`;

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

const DropItem = styled.li`
  padding: 5px;
  &:hover {
    color: var(--green-010);
  }
`;
