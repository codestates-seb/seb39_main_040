import React, { useRef, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 600px;
  height: 580px;
  .imgUpload {
    display: none;
  }
`;

// 이미지미리보기 컨테이너
const ImgContainer = styled.div`
  width: 600px;
  height: 560px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #bcbdbd;
  .icon {
    color: #c9cdd2;
  }
  img {
    margin-right: 65px;
    width: 600px;
    height: 550px;
    border-radius: 10px;
  }
`;

// 버튼 컨테이너
const BtnContainer = styled.div`
  width: 700px;
  position: relative;
  margin: 10px 165px 0 0;
  button {
    position: absolute;
    right: 0;
    width: 80px;
    height: 25px;
    border-radius: 5px;
    background-color: #bcbdbd;
    color: #fff;
  }
  button:hover {
    background-color: #919191;
  }
`;

const NewImageUpload = () => {
  const [imgSrc, setImgSrc] = useState("");

  // useRef를 사용해 선택하고자 하는 DOM인 input을 가리킴
  const imgInput = useRef();

  // 이미지업로드 버튼을 눌렀을 때
  const onSubmitImg = (e) => {
    e.preventDefault();
    //클릭DOM API click()을 호출, 내가 input에 넣은 값을 click()
    imgInput.current.click();
  };

  // 이미지 미리보기 구현 (FileReader사용)
  // input에 입력한 파일 객체 -> base64로 인코딩.
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
    <MainWrapper>
      <ImgContainer>
        {imgSrc ? (
          <img src={imgSrc} alt="이미지 미리보기" />
        ) : (
          <FontAwesomeIcon className="icon" icon={faImage} size="3x" />
        )}
      </ImgContainer>
      <input
        type="file"
        ref={imgInput}
        accept="image/*"
        className="imgUpload"
        onChange={(e) => onImgChange(e.target.files[0])}
      />
      <BtnContainer>
        <button type="button" onClick={onSubmitImg}>
          사진 올리기
        </button>
      </BtnContainer>
      {/* <img src=""/> */}
    </MainWrapper>
  );
};

export default NewImageUpload;
