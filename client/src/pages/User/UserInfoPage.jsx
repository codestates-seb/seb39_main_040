import axios from "axios";
import { Link } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Header from "../../components/common/Header";
import MiddleTitle from "../../components/common/MiddleTitle";

const UserPageWrapper = styled.div`
  border: 1px solid var(--gray-030);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  width: 60%;
  height: 80vh;
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
  margin-top: 30px;
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
  width: 400px;
  padding: 10px 30px;
`;

const UserInfoBox = styled.div`
  display: flex;
  width: 400px;
  padding: 10px 30px;
`;

const UserDataType = styled.div`
  margin: 10px 0;
  width: 80px;
  padding: 10px;
`;

const UserData = styled.span`
  width: 70%;
  padding: 10px;
  margin: 10px 0;
  border-bottom: 1px solid var(--gray-030);
  margin-left: 15px;
`;

const Button = styled.button`
  border: 1px solid var(--green-010);
  border-radius: 5px;
  background: var(--white-010);
  color: var(--green-010);
  width: 100%;
  margin-top: 20px;
  margin-left: 29px;
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
  const [userInfo, setUserInfo] = useState([]);
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

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/users/information`, {
        headers: { AccessToken: sessionStorage.getItem("access_token") },
      })
      .then((res) => {
        console.log("데이터불러오기성공");
        console.log(res.data);
        setUserInfo(res.data);
      })
      .catch((err) => console.log(err));
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
          {/* <UserImgUpload>
            <button onClick={onSubmitImg}>프로필 사진 선택</button>
            <input
              className="profile"
              type="file"
              ref={imgInput}
              accept="image/*"
              onChange={(e) => onImgChange(e.target.files[0])}
            />
          </UserImgUpload> */}
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
        </UserInfoWrapper>
      </UserPageWrapper>
    </>
  );
};

export default UserInfoPage;
