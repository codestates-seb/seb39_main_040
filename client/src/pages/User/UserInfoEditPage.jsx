import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/common/Header";
import useAuthStore from "../../store/useAuth";
import useLoginStore from "../../store/useLoginStore";

const EditWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80vh;
  position: relative;
  margin: 0 auto;
`;

const UserImgUpdate = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  width: 250px;
  height: 250px;

  // 정의된 너비와 높이를 가득 채울때까지 확대
  object-fit: cover;
  border-radius: 50%;
`;

const ImgUpdateButton = styled.div`
  border: none;
  background: none;
  cursor: pointer;
  > button {
    margin-top: 10px;
    font-weight: 600;
    font-size: 1.2rem;
  }
  > input.profile {
    display: none;
  }
`;

const InfoWrapper = styled.form`
  width: 400px;
  padding: 10px 30px;
`;

const InfoDataBox = styled.div`
  display: flex;
  margin-top: 10px;
  input {
    width: 70%;
    padding: 10px;
    margin: 10px 0;
    border: none;
    border-bottom: 1px solid var(--gray-030);
    outline: none;
    margin-left: 15px;

    &:focus {
      border: none;
      border-bottom: 1px solid var(--gray-030);
      box-shadow: 5px 5px 10px var(--gray-020);
      transition: 0.3s;
    }
  }
`;

const InputData = styled.div`
  margin: 10px 0;
  width: 80px;
  padding: 10px;
`;

const UpdateButton = styled.button`
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

const UserInfoEditPage = () => {
  const [imgSrc, setImgSrc] = useState("");
  const [userName, setUserName] = useState("");
  const [mobile, setMobile] = useState("");
  const { userInfo, setUserInfo } = useAuthStore();
  const { isLogin, setIsLogin } = useLoginStore();

  const imgInput = useRef();

  const navigate = useNavigate();
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

  const onChangeInfo = (e) => {
    e.preventDefault();
    const newInfo = { userName: userName, mobile: mobile };
    axios
      .patch(`${process.env.REACT_APP_API}/users/information`, newInfo, {
        headers: { AccessToken: sessionStorage.getItem("access_token") },
      })
      .then(() => {
        console.log("정보수정완료");
        e.preventDefault();
        if (sessionStorage.getItem("access_token") === true) {
        }
        navigate("/userinfo");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Header />
      <EditWrapper>
        <UserImgUpdate>
          <Img src={imgSrc} alt="이미지확인" />
          <ImgUpdateButton>
            <button onClick={onSubmitImg}>프로필 사진 선택</button>
            <input
              className="profile"
              type="file"
              ref={imgInput}
              accept="image/*"
              onChange={(e) => onImgChange(e.target.files[0])}
            />
          </ImgUpdateButton>
        </UserImgUpdate>
        <InfoWrapper onSubmit={onChangeInfo}>
          <InfoDataBox>
            <InputData>이름</InputData>
            <input
              placeholder={userInfo.userName}
              onChange={(e) => setUserName(e.target.value)}
            ></input>
          </InfoDataBox>
          <InfoDataBox>
            <InputData>전화번호</InputData>
            <input
              placeholder="변경할 전화번호를 적어주세요"
              onChange={(e) => setMobile(e.target.value)}
            ></input>
          </InfoDataBox>
          <UpdateButton>수정 완료</UpdateButton>
        </InfoWrapper>
      </EditWrapper>
    </>
  );
};

export default UserInfoEditPage;
