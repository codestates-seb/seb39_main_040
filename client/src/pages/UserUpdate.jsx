import React, { useRef, useState } from "react";
import styled from "styled-components";

const EditWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90vh;
  position: relative;
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
    border: 1px solid Gainsboro;
    outline: none;
    margin-left: 15px;

    &:focus {
      border: none;
      border: 1px solid Gainsboro;
      box-shadow: 5px 5px 10px Gainsboro;
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
  border: 1px solid red;
  width: 100%;
  margin-top: 30px;
  font-size: 1.2rem;
  padding: 10px 40px;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

const UserUpdate = () => {
  const [imgSrc, setImgSrc] = useState("");
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

  return (
    <EditWrapper>
      <UserImgUpdate>
        <Img
          src="https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/944/eabb97e854d5e5927a69d311701cc211_res.jpeg"
          alt="이미지확인"
        />
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
      <InfoWrapper>
        <InfoDataBox>
          <InputData>이름</InputData>
          <input placeholder="변경할 이름을 적어주세요"></input>
        </InfoDataBox>
        <InfoDataBox>
          <InputData>이메일</InputData>
          <input placeholder="변경할 이메일을 적어주세요"></input>
        </InfoDataBox>
        <InfoDataBox>
          <InputData>전화번호</InputData>
          <input placeholder="변경할 전화번호를 적어주세요"></input>
        </InfoDataBox>
        <UpdateButton>수정 완료</UpdateButton>
      </InfoWrapper>
    </EditWrapper>
  );
};

export default UserUpdate;
