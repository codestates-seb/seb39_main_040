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
    axios.post(`${process.env.REACT_APP_API}/users/withdraw`);
  };

  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_API}/users/information`, {
  //       headers: { AccessToken: sessionStorage.getItem("access_token") },
  //     })
  //     .then((res) => {
  //       console.log("데이터불러오기성공");
  //       console.log(res.data);
  //       setUserInfo(res.data);
  //       setIsLogin(true);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

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
          <Button>탈퇴하기</Button>
        </UserInfoWrapper>
      </UserPageWrapper>
    </>
  );
};

export default UserInfoPage;
