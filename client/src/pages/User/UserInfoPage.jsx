import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import instance from "../../api/core";

import Header from "../../components/common/Header";
import MiddleTitle from "../../components/common/MiddleTitle";
import useLoginStore from "../../store/useLoginStore";
import Swal from "sweetalert2";

const UserInfoPage = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [userProfile, setUserProfile] = useState();
  const navigate = useNavigate();
  const { setIsLogin } = useLoginStore();

  const withDrawHandler = () => {
    Swal.fire({
      title: "정말 탈퇴하시겠습니까?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "var(--green-010)",
      cancelButtonColor: "var(--red-010)",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        instance
          .post(`${process.env.REACT_APP_API}/users/withdraw`)
          .then(() => {
            Swal.fire({
              title: "회원이 탈퇴되었습니다.",
              text: "다음에 꼭 다시 만나요 😁",
              icon: "success",
              confirmButtonColor: "var(--green-010)",
            });
            navigate("/");
            setIsLogin();
          })
          .catch(() =>
            Swal.fire({
              title: "회원 탈퇴에 실패했습니다",
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
      const response = await instance.get(
        `${process.env.REACT_APP_API}/users/information`
      );
      setUserInfo(response);
      setUserProfile(response.profilePhoto.path);
    }
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <MiddleTitle>회원정보</MiddleTitle>
      <UserPageWrapper>
        <UserImgBox>
          <UserImg src={`${userProfile}`} alt="userimg" />
        </UserImgBox>
        <UserInfoWrapper>
          <UserInfoBox>
            <UserDataType>이름</UserDataType>
            <UserData>{userInfo.userName}</UserData>
          </UserInfoBox>
          <UserInfoBox>
            <UserDataType>이메일</UserDataType>
            <UserData>{userInfo.email}</UserData>
          </UserInfoBox>
          <UserInfoBox>
            <UserDataType>전화번호</UserDataType>
            <UserData>{userInfo.mobile}</UserData>
          </UserInfoBox>
          <Link to="/userinfoedit">
            <Button>수정하기</Button>
          </Link>
          <Button onClick={withDrawHandler}>탈퇴하기</Button>
        </UserInfoWrapper>
      </UserPageWrapper>
    </>
  );
};

export default UserInfoPage;

const UserPageWrapper = styled.div`
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 70vh;
  position: relative;
  margin: 0 auto;
`;

const UserImgBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UserImg = styled.img`
  width: 250px;
  height: 250px;

  object-fit: cover;
  border-radius: 50%;
`;

const UserInfoWrapper = styled.div`
  width: 350px;
  padding: 5px 30px;
`;

const UserInfoBox = styled.div`
  display: flex;
  width: 350px;
  padding: 5px 0px;
`;

const UserDataType = styled.div`
  margin: 10px 0;
  width: 80px;
  padding: 8px;
  color: var(--black-010);
  opacity: 0.7;
`;

const UserData = styled.span`
  width: 50%;
  padding: 10px;
  margin: 10px 0;
  border-bottom: 1px solid var(--gray-030);
  margin-left: 15px;
  color: var(--black-010);
  opacity: 0.7;
`;

const Button = styled.button`
  border: 1px solid var(--green-010);
  border-radius: 5px;
  background: var(--white-010);
  color: var(--green-010);
  width: 100%;
  margin-top: 20px;

  font-size: 1.2rem;
  padding: 10px 40px;
  cursor: pointer;
  &:hover {
    color: var(--white-010);
    background: var(--green-010);
  }
`;
