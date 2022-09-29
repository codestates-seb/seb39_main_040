import axios from "axios";
import { Link } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Header from "../../components/common/Header";
import MiddleTitle from "../../components/common/MiddleTitle";
import useAuthStore from "../../store/useAuth";
import useLoginStore from "../../store/useLoginStore";

const UserPageWrapper = styled.div`
  border: 1px solid var(--gray-030);
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
  //margin-top: 30px;
  width: 250px;
  height: 250px;

  object-fit: cover;
  border-radius: 50%;
`;

const UserImgUpload = styled.div`
  border: none;
  background: none;
  cursor: pointer;
  > button {
    margin-top: 15px;
    font-weight: 600;
    font-size: 1.2rem;
  }
  > input.profile {
    display: none;
  }
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

const UserInfoPage = () => {
  const [imgSrc, setImgSrc] = useState("");
  // const [userInfo, setUserInfo] = useState([]);
  const { userInfo, setUserInfo } = useAuthStore();
  const { isLogin, setIsLogin } = useLoginStore();

  const imgInput = useRef();
  const onSubmitImg = (e) => {
    e.preventDefault();
    imgInput.current.click();
  };

  const onImgChange = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImgSrc(reader.result);
        resolve();
        // 우리가 입력한 파일정보
        console.log(fileBlob);
        // base64로 인코딩한 파일정보
        // console.log(reader.result);
      };
    });
  };

  const withDrawHandler = () => {
    // if(sessionStorage.getItem("access_token") === undefined) {
    //  토큰 재발급 함수
    //  로컬 스토리지에 저장된 refresh token을 통해 토큰을 재발급한다.
    //  그 과정에서 로컬스토리지, 세션스토리지에 각각 refresh token / access token을 다시 저장한다.
    //  그러고 나서 원래 핸들러 함수로 돌아와 axios 요청을 시행한다.
    //  만약 리프레쉬 토큰까지 만료되었다면 -> 로그인 재요청 해야함!
    // -> 로컬에 저장된 isLogin 상태가 사라지거나 false로 되어야함!
    // }
    axios
      .post(`${process.env.REACT_APP_API}/users/withdraw`, {
        headers: { AccessToken: sessionStorage.getItem("access_token") },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response.status));
  };

  useEffect(() => {
    setUserInfo();
  }, []);

  return (
    <>
      <Header />
      <MiddleTitle>회원정보</MiddleTitle>
      <UserPageWrapper>
        <UserImgBox>
          <UserImg
            src="https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/944/eabb97e854d5e5927a69d311701cc211_res.jpeg"
            alt="userimg"
          />
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
