import React, { useRef, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 510px;
  .imgUpload {
    display: none;
  }
`;

const ImgContainer = styled.div`
  width: 400px;
  height: 400px;
  background-color: var(--gray-030);
  display: flex;
  align-items: center;
  justify-content: center;
  .icon {
    color: var(--gray-020);
  }
  img {
    width: 400px;
    height: 400px;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  margin-top: 20px;
  button {
    font-size: 18px;
    width: 400px;
    height: 50px;
    border-radius: 5px;
    border: 1px solid var(--green-010);
    background-color: var(--white-010);
    color: var(--green-010);
    cursor: pointer;
  }
  button:hover {
    background-color: var(--green-010);
    color: var(--white-010);
  }
`;

const ReviewImageUpload = () => {
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

export default ReviewImageUpload;
