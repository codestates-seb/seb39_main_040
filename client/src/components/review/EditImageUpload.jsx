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

const EditImageUpload = () => {
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

        console.log(fileBlob);
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
    </MainWrapper>
  );
};

export default EditImageUpload;
